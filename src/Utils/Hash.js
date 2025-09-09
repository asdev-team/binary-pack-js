/**
 * Класс Hash предоставляет методы для генерации хэшей из строковых данных.
 * Реализует простую и эффективную хэш-функцию, подходящую для некриптографических целей,
 * таких как распределение по buckets или создание простых контрольных сумм.
 *
 * @author TM Project <tm-project@asdev.ru>
 * @version 1.0
 * @license MIT
 *
 * @class
 * @example
 * const hashValue = Hash.secret('my-secret-key');
 * console.log(hashValue); // 123456789 (пример числового хэша)
 */
class Hash {
    /**
     * Генерирует числовой хэш из строки с использованием простого алгоритма.
     * Алгоритм основан на циклическом сдвиге и сложении, что обеспечивает
     * равномерное распределение для большинства практических применений.
     *
     * @static
     * @param {string} secret - Входная строка для хэширования
     * @returns {number} Числовой хэш в диапазоне от 0 до 2^32-1
     * @throws {Error} Если параметр не является строкой
     * @example
     * const hashValue = Hash.secret('my-secret-key');
     * console.log(hashValue); // 123456789
     */
    static secret(secret) {
        // Валидация входного параметра
        if (typeof secret !== 'string') {
            throw new Error('Параметр должен быть строкой');
        }

        // Пустая строка возвращает 0
        if (secret.length === 0) {
            return 0;
        }

        let hash = 0;
        for (let i = 0; i < secret.length; i++) {
            // Алгоритм: hash = hash * 31 + charCode
            // Сдвиг на 5 битов влево эквивалентен умножению на 32
            // Вычитание hash эквивалентно умножению на 31 (32 - 1)
            hash = ((hash << 5) - hash) + secret.charCodeAt(i);

            // Преобразование в 32-битное целое число
            hash |= 0;
        }

        // Возвращаем абсолютное значение для гарантии положительного числа
        return Math.abs(hash);
    }
}

export {Hash};