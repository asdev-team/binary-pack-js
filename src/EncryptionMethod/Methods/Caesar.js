import {MethodInterface} from "./_MethodInterface.js";


// Константа с именем метода шифрования
const METHOD_NAME = 'caesar';

/**
 * Реализация шифра Цезаря, наследующая от MethodInterface.
 * Предоставляет модифицированную версию шифра Цезаря для работы с бинарными данными,
 * где сдвиг вычисляется на основе хэша секретного ключа.
 *
 * @author TM Project <tm-project@asdev.ru>
 * @version 1.0
 * @license MIT
 *
 * @class Caesar
 * @extends MethodInterface
 * @example
 * const caesar = new Caesar('my-secret-key');
 * const data = new Uint8Array([1, 2, 3, 4, 5]);
 * caesar.encrypt(data); // Данные зашифрованы
 * caesar.decrypt(data); // Данные расшифрованы
 */
class Caesar extends MethodInterface {
    /**
     * Статическое свойство с именем метода шифрования
     * @static
     * @type {string}
     */
    static name = METHOD_NAME;

    /**
     * Создает экземпляр шифра Цезаря с указанным секретным ключом.
     *
     * @constructor
     * @param {string} secret - Секретный ключ для шифрования и дешифрования
     */
    constructor(secret) {
        // Вызов конструктора родительского класса с именем метода
        super(METHOD_NAME);

        /**
         * Секретный ключ, используемый для вычисления величины сдвига
         * @type {string}
         * @private
         */
        this.secret = secret;
    }

    /**
     * Шифрует данные с использованием модифицированного шифра Цезаря.
     * Величина сдвига вычисляется на основе хэша секретного ключа.
     * Каждый байт данных сдвигается на вычисленную величину по модулю 256.
     *
     * @param {Uint8Array} dataPart - Часть данных для шифрования (изменяется на месте)
     * @returns {void}
     * @example
     * const data = new Uint8Array([1, 2, 3, 4, 5]);
     * caesar.encrypt(data); // Данные зашифрованы
     */
    encrypt(dataPart) {
        // Вычисление хэша секретного ключа
        const secretHash = this.hash.secret(this.secret);

        // Вычисление величины сдвига (ограниченной диапазоном 0-25)
        const shift = secretHash % 26;

        // Применение сдвига к каждому байту данных
        for (let i = 0; i < dataPart.length; i++) {
            dataPart[i] = (dataPart[i] + shift) % 256;
        }
    }

    /**
     * Дешифрует данные, зашифрованные с помощью шифра Цезаря.
     * Выполняет обратный сдвиг на ту же величину для восстановления исходных данных.
     *
     * @param {Uint8Array} dataPart - Часть данных для дешифрования (изменяется на месте)
     * @returns {void}
     * @example
     * const encryptedData = new Uint8Array([...]); // Зашифрованные данные
     * caesar.decrypt(encryptedData); // Данные расшифрованы
     */
    decrypt(dataPart) {
        // Вычисление хэша секретного ключа (должно быть идентично шифрованию)
        const secretHash = this.hash.secret(this.secret);

        // Вычисление величины сдвига (должно быть идентично шифрованию)
        const shift = secretHash % 26;

        // Применение обратного сдвига к каждому байту данных
        for (let i = 0; i < dataPart.length; i++) {
            // Добавление 256 перед вычитанием для избежания отрицательных значений
            dataPart[i] = (dataPart[i] - shift + 256) % 256;
        }
    }
}

export {Caesar};