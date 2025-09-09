/**
 * Глобальная декларация для браузерного окружения
 */

declare global {
    interface Window {
        BinaryPack: typeof import('./index').BinaryPack;
        AvailableMethodsName: typeof import('./index').AvailableMethodsName;
    }
}

export {};