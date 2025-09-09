/**
 * BinaryPack - JavaScript library for binary data serialization with encryption
 * @version 1.0.0
 * @license MIT
 */

export type EncryptionMethod = 'xor' | 'caesar' | 'aes-like' | null;

export interface AvailableMethodsNameType {
    XOR: 'xor';
    AES: 'aes-like';
    CAESAR: 'caesar';
}

/**
 * Объект-справочник для получения имен методов шифрования по удобным ключам.
 * Предоставляет псевдонимы для доступа к именам методов шифрования.
 *
 * @constant {Object}
 * @type {{XOR: string, AES: string, CAESAR: string}}
 */
export declare const AvailableMethodsName: AvailableMethodsNameType;

/**
 * Класс BinaryPack предоставляет функциональность для упаковки данных в бинарный формат
 * с поддержкой опционального шифрования. Поддерживает сериализацию любых JSON-совместимых
 * данных в ArrayBuffer с возможностью последующего преобразования в Base64 для передачи.
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
export declare class BinaryPack {
    /**
     * Создает экземпляр BinaryPack для упаковки и распаковки данных с опциональным шифрованием.
     *
     * @constructor
     * @param {string | null} secret - Секретное слово для шифрования (опционально)
     * @param {string | null} encryptionMethod - Метод шифрования: 'xor', 'caesar', 'aes-like' или null
     * @throws {Error} Если параметры не соответствуют требованиям
     */
    constructor(secret?: string | null, encryptionMethod?: EncryptionMethod);

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
    pack(data: any): ArrayBuffer;

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
    unpack(buffer: ArrayBuffer): any;

    /**
     * Статический метод для конвертации ArrayBuffer в Base64 строку.
     *
     * @static
     * @param {ArrayBuffer} buffer - Бинарные данные для конвертации
     * @returns {string} - Строка в формате Base64
     * @example
     * const base64String = BinaryPack.bufferToBase64(binaryData);
     */
    static bufferToBase64(buffer: ArrayBuffer): string;

    /**
     * Статический метод для конвертации Base64 строки обратно в ArrayBuffer.
     *
     * @static
     * @param {string} base64 - Base64 строка для конвертации
     * @returns {ArrayBuffer} - Бинарные данные в формате ArrayBuffer
     * @example
     * const buffer = BinaryPack.base64ToBuffer(base64String);
     */
    static base64ToBuffer(base64: string): ArrayBuffer;
}

// Export for CommonJS compatibility
export as namespace BinaryPackJS;

export * from './global';