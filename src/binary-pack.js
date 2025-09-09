import {Base64} from './Utils/index.js';
import {EncryptionMethod, AvailableMethods, AvailableMethodsName} from './EncryptionMethod/index.js';

/**
 * Класс BinaryPack предоставляет функциональность для упаковки данных в бинарный формат
 * с поддержкой опционального шифрования. Поддерживает сериализацию любых JSON-совместимых
 * данных в ArrayBuffer с возможностью последующего преобразования в Base64 для передачи.
 *
 * @author TM Project <tm-project@asdev.ru>
 * @version 1.0
 * @license MIT
 *
 * @class BinaryPack
 * @example
 * const packer = new BinaryPack('secret-key', 'aes-like');
 * const data = { message: 'Hello', number: 42 };
 *
 * // Упаковка данных
 * const binaryData = packer.pack(data);
 * const base64String = BinaryPack.bufferToBase64(binaryData);
 *
 * // Распаковка данных
 * const buffer = BinaryPack.base64ToBuffer(base64String);
 * const unpackedData = packer.unpack(buffer);
 */
class BinaryPack {
    // Приватные константы для формата данных

    // Версия
    #VERSION = 1;

    // Сдвиг для записи версии
    #OFFSET_VERSION = 0;

    // Сдвиг для записи кода метода
    #OFFSET_METHOD_CODE = 1;

    // Сдвиг для записи длинны данных
    #OFFSET_DATA_LENGTH = 2;

    // Сдвиг для записи данных
    #OFFSET_DATA = 6;

    //Количество байт для метаданных
    #META_LENGTH = 6;

    /**
     * Создает экземпляр BinaryPack для упаковки и распаковки данных с опциональным шифрованием.
     *
     * @constructor
     * @param {string | null} secret - Секретное слово для шифрования (опционально)
     * @param {string | null} encryptionMethod - Метод шифрования: 'xor', 'caesar', 'aes-like' или null
     * @throws {Error} Если параметры не соответствуют требованиям
     */
    constructor(secret = null, encryptionMethod = null) {
        /**
         * Секретный ключ для шифрования
         * @type {string|null}
         * @private
         */
        this.secret = secret;

        /**
         * Выбранный метод шифрования
         * @type {string|null}
         * @private
         */
        this.encryptionMethod = encryptionMethod;

        /**
         * Кодировщик текста в бинарные данные
         * @type {TextEncoder}
         * @private
         */
        this.encoder = new TextEncoder();

        /**
         * Декодировщик бинарных данных в текст
         * @type {TextDecoder}
         * @private
         */
        this.decoder = new TextDecoder();

        /**
         * Экземпляр EncryptionMethod для обработки шифрования
         * @type {EncryptionMethod}
         * @private
         */
        this.encryptor = new EncryptionMethod(this.secret, this.#META_LENGTH);

        /**
         * Список допустимых имен методов шифрования
         * @type {Array<string>}
         * @private
         */
        this.validMethodsName = AvailableMethods.map(({name}) => name);

        // Валидация параметров
        if (secret && !encryptionMethod) {
            throw new Error('Метод шифрования обязателен при указании секрета');
        }

        if (encryptionMethod && !secret) {
            throw new Error('Секрет обязателен при выборе метода шифрования');
        }

        if (encryptionMethod && !this.validMethodsName.includes(encryptionMethod)) {
            throw new Error(`Неподдерживаемый метод шифрования: ${encryptionMethod}. Доступные: ${this.validMethodsName.join(', ')}`);
        }
    }

    /**
     * Упаковывает данные в бинарный формат с возможным шифрованием.
     * Формат данных: [версия:1B][метод:1B][длина данных:4B][данные...]
     *
     * @param {any} data - Данные для упаковки (любые JSON-совместимые данные)
     * @returns {ArrayBuffer} - Бинарные данные в формате ArrayBuffer
     * @throws {Error} При ошибках сериализации или невалидных данных
     * @example
     * const data = { message: 'Hello', number: 42 };
     * const binaryData = packer.pack(data);
     */
    pack(data) {
        try {
            // Сериализуем данные в JSON строку
            const jsonString = JSON.stringify(data);

            // Конвертируем строку в Uint8Array
            const stringBytes = this.encoder.encode(jsonString);

            // Создаем буфер с дополнительными 6 байтами для метаданных
            const buffer = new ArrayBuffer(stringBytes.length + this.#META_LENGTH);
            const view = new DataView(buffer);

            // Записываем версию (1 байт)
            view.setUint8(this.#OFFSET_VERSION, this.#VERSION);

            // Записываем метод шифрования (1 байт)
            const methodCode = this.encryptor.getEncryptionMethodCode(this.encryptionMethod);
            view.setUint8(this.#OFFSET_METHOD_CODE, methodCode);

            // Записываем длину данных (4 байта)
            view.setUint32(this.#OFFSET_DATA_LENGTH, stringBytes.length);

            // Копируем данные строки
            const dataBytes = new Uint8Array(buffer, this.#OFFSET_DATA);
            dataBytes.set(stringBytes);

            // Применяем шифрование если есть секрет (только к данным, не к заголовку)
            if (this.secret && this.encryptionMethod) {
                return this.encryptor.encrypt(buffer, this.encryptionMethod);
            }

            return buffer;

        } catch (error) {
            throw new Error(`Ошибка упаковки данных: ${error.message}`);
        }
    }

    /**
     * Распаковывает данные из бинарного формата с возможным дешифрованием.
     *
     * @param {ArrayBuffer} buffer - Бинарные данные для распаковки
     * @returns {any} - Восстановленные данные в исходном формате
     * @throws {Error} При ошибках десериализации, несоответствии версии или методов шифрования
     * @example
     * const unpackedData = packer.unpack(binaryData);
     * console.log(unpackedData.message); // 'Hello'
     */
    unpack(buffer) {
        try {
            // Создаем копию буфера для безопасной обработки
            const bufferCopy = buffer.slice(0);
            const view = new DataView(bufferCopy);

            // Проверяем версию
            const version = view.getUint8(this.#OFFSET_VERSION);
            if (version !== this.#VERSION) {
                throw new Error('Неверная версия формата данных');
            }

            const methodCode = view.getUint8(this.#OFFSET_METHOD_CODE);

            // Проверяем соответствие методов шифрования
            if (this.secret && this.encryptionMethod) {
                const storedMethod = this.encryptor.getEncryptionMethodName(methodCode);
                if (this.encryptionMethod !== storedMethod) {
                    throw new Error('Несоответствие методов шифрования');
                } else {
                    this.encryptor.decrypt(bufferCopy, methodCode);
                }
            }

            // Читаем длину данных
            const dataLength = view.getUint32(this.#OFFSET_DATA_LENGTH);

            // Проверяем корректность длины
            if (dataLength > bufferCopy.byteLength - this.#META_LENGTH) {
                throw new Error('Некорректная длина данных');
            }

            // Извлекаем данные строки
            const stringBytes = new Uint8Array(bufferCopy, this.#OFFSET_DATA, dataLength);
            const jsonString = this.decoder.decode(stringBytes);

            // Парсим JSON
            return JSON.parse(jsonString);

        } catch (error) {
            throw new Error(`Ошибка распаковки данных: ${error.message}`);
        }
    }

    /**
     * Статический метод для конвертации ArrayBuffer в Base64 строку.
     *
     * @static
     * @param {ArrayBuffer} buffer - Бинарные данные для конвертации
     * @returns {string} - Строка в формате Base64
     * @example
     * const base64String = BinaryPack.bufferToBase64(binaryData);
     */
    static bufferToBase64(buffer) {
        return Base64.bufferToBase64(buffer);
    }

    /**
     * Статический метод для конвертации Base64 строки обратно в ArrayBuffer.
     *
     * @static
     * @param {string} base64 - Base64 строка для конвертации
     * @returns {ArrayBuffer} - Бинарные данные в формате ArrayBuffer
     * @example
     * const buffer = BinaryPack.base64ToBuffer(base64String);
     */
    static base64ToBuffer(base64) {
        return Base64.base64ToBuffer(base64);
    }
}

export {BinaryPack, AvailableMethodsName};