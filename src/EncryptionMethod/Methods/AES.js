import {MethodInterface} from "./_MethodInterface.js";

// Константа с именем метода шифрования
const METHOD_NAME = 'aes-like';

/**
 * Реализация AES-подобного метода шифрования, наследующая от MethodInterface.
 * Предоставляет упрощенную версию AES-алгоритма с тремя раундами преобразований.
 *
 * @author TM Project <tm-project@asdev.ru>
 * @version 1.0
 * @license MIT
 *
 * @class AES
 * @extends MethodInterface
 * @example
 * const aes = new AES('my-secret-key');
 * const data = new Uint8Array([1, 2, 3, 4, 5]);
 * aes.encrypt(data); // Данные зашифрованы
 * aes.decrypt(data); // Данные расшифрованы
 */
class AES extends MethodInterface {
    /**
     * Статическое свойство с именем метода шифрования
     * @static
     * @type {string}
     */
    static name = METHOD_NAME;

    /**
     * Создает экземпляр AES-шифрования с указанным секретным ключом.
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
     * Шифрует данные с использованием AES-подобного алгоритма.
     * Алгоритм использует три раунда преобразований, комбинируя данные
     * с секретным ключом с помощью операций XOR и сложения.
     *
     * @param {Uint8Array} dataPart - Часть данных для шифрования (изменяется на месте)
     * @returns {void}
     * @example
     * const data = new Uint8Array([1, 2, 3, 4, 5]);
     * aes.encrypt(data); // Данные зашифрованы
     */
    encrypt(dataPart) {
        // Преобразование секретного ключа в байты
        const secretBytes = this.encoder.encode(this.secret);
        const rounds = 3;

        // Три раунда шифрования
        for (let round = 0; round < rounds; round++) {
            for (let i = 0; i < dataPart.length; i++) {
                // Выбор байта ключа на основе позиции и раунда
                const secretByte = secretBytes[(i + round) % secretBytes.length];

                // Преобразование: XOR с ключом + добавление раунда и индекса
                dataPart[i] = ((dataPart[i] ^ secretByte) + round + i) % 256;
            }
        }
    }

    /**
     * Дешифрует данные, зашифрованные с помощью AES-подобного алгоритма.
     * Выполняет обратные операции в обратном порядке для восстановления исходных данных.
     *
     * @param {Uint8Array} dataPart - Часть данных для дешифрования (изменяется на месте)
     * @returns {void}
     * @example
     * const encryptedData = new Uint8Array([...]); // Зашифрованные данные
     * aes.decrypt(encryptedData); // Данные расшифрованы
     */
    decrypt(dataPart) {
        // Преобразование секретного ключа в байты
        const secretBytes = this.encoder.encode(this.secret);
        const rounds = 3;

        // Обратные раунды дешифрования (в обратном порядке)
        for (let round = rounds - 1; round >= 0; round--) {
            for (let i = dataPart.length - 1; i >= 0; i--) {
                // Выбор байта ключа на основе позиции и раунда
                const secretByte = secretBytes[(i + round) % secretBytes.length];

                // Обратное преобразование: вычитание раунда и индекса, затем XOR с ключом
                dataPart[i] = ((dataPart[i] - round - i + 256) % 256) ^ secretByte;
            }
        }
    }
}

export {AES};