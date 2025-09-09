import {AvailableMethods, AvailableMethodsName} from './Methods/index.js';

/**
 * Класс EncryptionMethod предоставляет абстракцию для работы с различными методами шифрования.
 * Он делегирует фактическое шифрование и дешифрование специализированным классам методов,
 * обеспечивая единый интерфейс для работы с различными алгоритмами шифрования.
 *
 * @author TM Project <tm-project@asdev.ru>
 * @version 1.0
 * @license MIT
 *
 * @class EncryptionMethod
 * @example
 * const encryptor = new EncryptionMethod('my-secret-key');
 * const encryptedData = encryptor.encrypt(buffer, 'aes-like');
 * const decryptedData = encryptor.decrypt(encryptedData, 3);
 */
class EncryptionMethod {
    /**
     * Создает экземпляр EncryptionMethod с указанным секретным ключом.
     *
     * @constructor
     * @param {string|null} secret - Секретный ключ, используемый для шифрования и дешифрования
     * @param {number} metaLength - Количество байт метаданных
     */
    constructor(secret, metaLength) {
        /**
         * Секретный ключ, используемый для шифрования и дешифрования
         * @type {string}
         * @private
         */
        this.secret = secret;

        /**
         * Сдвиг данных в буфере
         * @type {number}
         * @private
         */
        this.metaLength = metaLength;

        /**
         * Доступные методы шифрования, импортированные из внешнего модуля
         * @type {Array<Object>}
         * @private
         */
        this.methods = AvailableMethods;
    }

    /**
     * Шифрует данные в буфере с использованием указанного метода шифрования.
     * Шифрование применяется только к части данных (начиная с 6-го байта),
     * чтобы сохранить метаданные (заголовок) незашифрованными.
     *
     * @param {ArrayBuffer} buffer - Буфер данных для шифрования
     * @param {string} method - Название метода шифрования (например, 'xor', 'aes-like')
     * @returns {ArrayBuffer} - Буфер с зашифрованными данными
     * @example
     * const buffer = new ArrayBuffer(100);
     * // ... заполнение буфера данными
     * const encrypted = encryptor.encrypt(buffer, 'aes-like');
     */
    encrypt(buffer, method) {
        // Поиск метода по имени
        const existMethod = this.methods.find(({name}) => name === method);

        // Если метод не найден, возвращаем исходный буфер без изменений
        if (!existMethod) {
            return buffer;
        }

        // Создаем представление для работы с буфером
        const view = new Uint8Array(buffer);

        // Выделяем часть данных для шифрования
        const dataPart = view.subarray(this.metaLength);

        // Создаем экземпляр класса шифрования и применяем шифрование
        const instance = existMethod.instance;
        const cl = new instance(this.secret);
        cl.encrypt(dataPart);

        return buffer;
    }

    /**
     * Дешифрует данные в буфере с использованием метода, указанного по коду.
     * Дешифрование применяется только к части данных, чтобы сохранить метаданные (заголовок).
     *
     * @param {ArrayBuffer} buffer - Буфер с зашифрованными данными
     * @param {number} methodCode - Код метода шифрования (например, 1, 2, 3)
     * @returns {ArrayBuffer} - Буфер с дешифрованными данными
     * @example
     * const decrypted = encryptor.decrypt(encryptedBuffer, 3);
     */
    decrypt(buffer, methodCode = 0) {
        // Поиск метода по коду
        const existMethod = this.methods.find(({code}) => code === methodCode);

        // Если метод не найден, возвращаем исходный буфер без изменений
        if (!existMethod) {
            return buffer;
        }

        // Создаем представление для работы с буфером
        const view = new Uint8Array(buffer);

        // Выделяем часть данных для дешифрования
        const dataPart = view.subarray(this.metaLength);

        // Создаем экземпляр класса шифрования и применяем дешифрование
        const instance = existMethod.instance;
        const cl = new instance(this.secret);
        cl.decrypt(dataPart);

        return buffer;
    }

    /**
     * Возвращает код метода шифрования по его имени.
     *
     * @param {string} method - Название метода шифрования
     * @returns {number} - Код метода или 0, если метод не найден
     * @example
     * const code = encryptor.getEncryptionMethodCode('aes-like');
     * console.log(code); // 3
     */
    getEncryptionMethodCode(method) {
        const existMethod = this.methods.find(({name}) => name === method);

        if (!existMethod) {
            return 0;
        }

        return existMethod.code;
    }

    /**
     * Возвращает название метода шифрования по его коду.
     *
     * @param {number} methodCode - Код метода шифрования
     * @returns {string|null} - Название метода или null, если метод не найден
     * @example
     * const name = encryptor.getEncryptionMethodName(3);
     * console.log(name); // 'aes-like'
     */
    getEncryptionMethodName(methodCode) {
        const existMethod = this.methods.find(({code}) => code === methodCode);

        if (!existMethod) {
            return null;
        }

        return existMethod.name;
    }
}

export {EncryptionMethod, AvailableMethods, AvailableMethodsName};