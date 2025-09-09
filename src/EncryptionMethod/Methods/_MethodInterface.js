import {Hash} from '../../Utils/Hash.js';

/**
 * Абстрактный базовый класс для реализации методов шифрования.
 * Определяет общий интерфейс и предоставляет общие утилиты для всех методов шифрования.
 * Не предназначен для прямого использования, только для наследования конкретными реализациями.
 *
 * @author TM Project <tm-project@asdev.ru>
 * @version 1.0
 * @license MIT
 *
 * @abstract
 * @class MethodInterface
 * @example
 * class MyEncryptionMethod extends MethodInterface {
 *   constructor(secret) {
 *     super('my-method');
 *     this.secret = secret;
 *   }
 *
 *   encrypt(dataPart) {
 *     // Реализация шифрования
 *   }
 *
 *   decrypt(dataPart) {
 *     // Реализация дешифрования
 *   }
 * }
 */
class MethodInterface {
    /**
     * Создает экземпляр MethodInterface с указанным именем метода.
     * Инициализирует общие утилиты для работы с текстом и хэшированием.
     *
     * @constructor
     * @param {string} name - Уникальное имя метода шифрования
     */
    constructor(name) {
        /**
         * Кодировщик текста в бинарные данные
         * @type {TextEncoder}
         * @protected
         */
        this.encoder = new TextEncoder();

        /**
         * Декодировщик бинарных данных в текст
         * @type {TextDecoder}
         * @protected
         */
        this.decoder = new TextDecoder();

        /**
         * Модуль хэширования для генерации ключей и преобразований
         * @type {Hash}
         * @protected
         */
        this.hash = Hash;

        /**
         * Уникальное имя метода шифрования
         * @type {string}
         * @protected
         */
        this.name = name;
    }

    /**
     * Абстрактный метод для шифрования части данных.
     * Должен быть реализован в дочерних классах.
     *
     * @abstract
     * @param {Uint8Array} dataPart - Часть данных для шифрования (представление в байтах)
     * @returns {void}
     * @throws {Error} При отсутствии реализации в дочернем классе
     */
    encrypt(dataPart) {
        throw new Error('Метод encrypt должен быть реализован в дочернем классе');
    }

    /**
     * Абстрактный метод для дешифрования части данных.
     * Должен быть реализован в дочерних классах.
     *
     * @abstract
     * @param {Uint8Array} dataPart - Часть данных для дешифрования (представление в байтах)
     * @returns {void}
     * @throws {Error} При отсутствии реализации в дочернем классе
     */
    decrypt(dataPart) {
        throw new Error('Метод decrypt должен быть реализован в дочернем классе');
    }

    /**
     * Возвращает имя метода шифрования.
     *
     * @returns {string} Уникальное имя метода шифрования
     * @example
     * const method = new MyEncryptionMethod('secret');
     * console.log(method.getName()); // 'my-method'
     */
    getName() {
        return this.name;
    }
}

export {MethodInterface};