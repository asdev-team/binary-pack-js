import {MethodInterface} from "./_MethodInterface.js";

// Константа с именем метода шифрования
const METHOD_NAME = 'xor';

/**
 * Реализация XOR-шифрования, наследующая от MethodInterface.
 * Предоставляет симметричное шифрование на основе операции исключающего ИЛИ (XOR).
 * Особенностью XOR-шифрования является то, что операция шифрования и дешифрования идентичны.
 *
 * @author TM Project <tm-project@asdev.ru>
 * @version 1.0
 * @license MIT
 *
 * @class XOR
 * @extends MethodInterface
 * @example
 * const xor = new XOR('my-secret-key');
 * const data = new Uint8Array([1, 2, 3, 4, 5]);
 * xor.encrypt(data); // Данные зашифрованы
 * xor.decrypt(data); // Данные расшифрованы
 */
class XOR extends MethodInterface {
    /**
     * Статическое свойство с именем метода шифрования
     * @static
     * @type {string}
     */
    static name = METHOD_NAME;

    /**
     * Создает экземпляр XOR-шифрования с указанным секретным ключом.
     *
     * @constructor
     * @param {string} secret - Секретный ключ для шифрования и дешифрования
     */
    constructor(secret) {
        // Вызов конструктора родительского класса с именем метода
        super(METHOD_NAME);

        /**
         * Секретный ключ, используемый для шифрования и дешифрования
         * @type {string}
         * @private
         */
        this.secret = secret;
    }

    /**
     * Шифрует данные с использованием операции исключающего ИЛИ (XOR).
     * Каждый байт данных комбинируется с соответствующим байтом ключа через операцию XOR.
     * Если ключ короче данных, он используется циклически.
     *
     * @param {Uint8Array} dataPart - Часть данных для шифрования (изменяется на месте)
     * @returns {void}
     * @example
     * const data = new Uint8Array([1, 2, 3, 4, 5]);
     * xor.encrypt(data); // Данные зашифрованы
     */
    encrypt(dataPart) {
        // Преобразование секретного ключа в байты
        const secretBytes = this.encoder.encode(this.secret);

        // Применение операции XOR к каждому байту данных
        for (let i = 0; i < dataPart.length; i++) {
            // Циклическое использование ключа через операцию modulo
            dataPart[i] ^= secretBytes[i % secretBytes.length];
        }
    }

    /**
     * Дешифрует данные, зашифрованные с помощью XOR-шифрования.
     * Поскольку операция XOR обратима и симметрична, дешифрование идентично шифрованию.
     *
     * @param {Uint8Array} dataPart - Часть данных для дешифрования (изменяется на месте)
     * @returns {void}
     * @example
     * const encryptedData = new Uint8Array([...]); // Зашифрованные данные
     * xor.decrypt(encryptedData); // Данные расшифрованы
     */
    decrypt(dataPart) {
        // Для XOR-шифрования дешифрование идентично шифрованию
        this.encrypt(dataPart);
    }
}

export {XOR};