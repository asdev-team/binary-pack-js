import { XOR } from './XOR.js';
import { AES } from './AES.js';
import { Caesar } from './Caesar.js';

/**
 * Массив доступных методов шифрования с их кодами, именами и классами-реализациями.
 * Каждый элемент массива содержит:
 * - code: числовой идентификатор метода
 * - name: строковое имя метода (соответствует статическому свойству name класса)
 * - instance: класс-реализация метода шифрования
 *
 * @constant {Array<Object>}
 * @type {Array<{code: number, name: string, instance: MethodInterface}>}
 */
const AvailableMethods = [
    { code: 1, name: XOR.name, instance: XOR },
    { code: 2, name: AES.name, instance: AES },
    { code: 3, name: Caesar.name, instance: Caesar },
];

/**
 * Объект-справочник для получения имен методов шифрования по удобным ключам.
 * Предоставляет псевдонимы для доступа к именам методов шифрования.
 *
 * @constant {Object}
 * @type {{XOR: string, AES: string, CAESAR: string}}
 */
const AvailableMethodsName = {
    'XOR': XOR.name,
    'AES': AES.name,
    'CAESAR': Caesar.name,
};

export { AvailableMethods, AvailableMethodsName };