/**
 * Класс Base64 предоставляет статические методы для преобразования бинарных данных (ArrayBuffer)
 * в строки формата Base64 и обратно. Это полезно для передачи бинарных данных через текстовые
 * протоколы, такие как HTTP, или для хранения в текстовых форматах (JSON, XML).
 *
 * @author TM Project <tm-project@asdev.ru>
 * @version 1.0
 * @license MIT
 *
 * @class
 * @example
 * const buffer = new ArrayBuffer(4);
 * const view = new Uint8Array(buffer);
 * view[0] = 1; view[1] = 2; view[2] = 3; view[3] = 4;
 *
 * const base64String = Base64.bufferToBase64(buffer);
 * console.log(base64String); // "AQIDBA=="
 *
 * const decodedBuffer = Base64.base64ToBuffer(base64String);
 * console.log(new Uint8Array(decodedBuffer)); // Uint8Array(4) [1, 2, 3, 4]
 */
class Base64 {
    /**
     * Преобразует ArrayBuffer в строку в кодировке Base64.
     *
     * @static
     * @param {ArrayBuffer} buffer - Бинарные данные для преобразования
     * @returns {string} Строка в кодировке Base64, представляющая исходные бинарные данные
     * @throws {Error} Если переданный буфер не является допустимым ArrayBuffer
     * @example
     * const buffer = new ArrayBuffer(4);
     * const view = new Uint8Array(buffer);
     * view[0] = 1; view[1] = 2; view[2] = 3; view[3] = 4;
     *
     * const base64String = Base64.bufferToBase64(buffer);
     * console.log(base64String); // "AQIDBA=="
     */
    static bufferToBase64(buffer) {
        // Валидация входного параметра
        if (!(buffer instanceof ArrayBuffer)) {
            throw new Error('Параметр должен быть экземпляром ArrayBuffer');
        }

        const bytes = new Uint8Array(buffer);
        let binary = '';

        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }

    /**
     * Преобразует строку в кодировке Base64 обратно в ArrayBuffer.
     *
     * @static
     * @param {string} base64 - Строка в кодировке Base64 для преобразования
     * @returns {ArrayBuffer} Бинарные данные, восстановленные из Base64 строки
     * @throws {Error} Если переданная строка не является допустимой Base64 строкой
     * @example
     * const base64String = "AQIDBA==";
     * const buffer = Base64.base64ToBuffer(base64String);
     *
     * const view = new Uint8Array(buffer);
     * console.log(view[0], view[1], view[2], view[3]); // 1, 2, 3, 4
     */
    static base64ToBuffer(base64) {
        // Валидация входного параметра
        if (typeof base64 !== 'string') {
            throw new Error('Параметр должен быть строкой');
        }

        // Проверка формата Base64 (регулярное выражение для валидации Base64)
        const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
        if (!base64Regex.test(base64)) {
            throw new Error('Неверный формат Base64 строки');
        }

        try {
            const binary = atob(base64);
            const buffer = new ArrayBuffer(binary.length);
            const bytes = new Uint8Array(buffer);

            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }

            return buffer;
        } catch (error) {
            throw new Error('Не удалось декодировать Base64 строку: ' + error.message);
        }
    }
}

export {Base64};