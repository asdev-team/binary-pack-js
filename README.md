# BinaryPack 
![GitHub package.json version](https://img.shields.io/github/package-json/v/asdev-team/binary-pack-js?logo=github)
![NPM Version](https://img.shields.io/npm/v/binary-pack-js?logo=npm)
![GitHub last commit](https://img.shields.io/github/last-commit/asdev-team/binary-pack-js?logo=datefns) 
![GitHub repo size](https://img.shields.io/github/repo-size/asdev-team/binary-pack-js)
![npm bundle size](https://img.shields.io/bundlephobia/min/binary-pack-js)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/binary-pack-js)
![GitHub Issues](https://img.shields.io/github/issues/asdev-team/binary-pack-js?logo=progress)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/asdev-team/binary-pack-js?logo=progress)
![GitHub License](https://img.shields.io/github/license/asdev-team/binary-pack-js)








JavaScript библиотека для бинарной сериализации данных с поддержкой шифрования. Поддерживает упаковку любых JSON-совместимых данных в бинарный формат с возможностью использования различных алгоритмов шифрования.

## Возможности
- 📦 Сериализация любых JSON-совместимых данных в бинарный формат
- 🔒 Множественные методы шифрования (XOR, Caesar, AES-like)
- ⚡ Высокая производительность с минимальными накладными расходами
- 📡 Готовность для сетевой передачи с Base64 конвертацией
- 🛡️ Встроенная валидация данных и обработка ошибок
- 🔧 TypeScript поддержка - полная типизация

## Установка

### NPM
```bash
npm install binary-pack-js
```

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/binary-pack-js@latest/dist/binary-pack.umd.min.js"></script>
```

## Использование

### ES модули (современные приложения)
```javascript
import {BinaryPack, AvailableMethodsName} from 'binary-pack-js';

const packer = new BinaryPack('my-secret', AvailableMethodsName.XOR);
const data = {
    server: 'Node.js',
    users: ['user1', 'user2'],
    config: {port: 3000, https: true}
};

console.log('Original data:', data);

// Pack and unpack
const binary = packer.pack(data);
console.log('Binary length:', binary.byteLength, 'bytes');

const unpacked = packer.unpack(binary);
console.log('Unpacked data:', unpacked);

// Base64 example
const base64 = BinaryPack.bufferToBase64(binary);
console.log('Base64 length:', base64.length, 'chars');

const fromBase64 = BinaryPack.base64ToBuffer(base64);
const fromBase64Unpacked = packer.unpack(fromBase64);
console.log('From Base64:', fromBase64Unpacked);
```

### CommonJS (Node.js)
```javascript
const {BinaryPack, AvailableMethodsName} = require('binary-pack-js');
const packer = new BinaryPack('my-secret', AvailableMethodsName.XOR);
const data = {
    server: 'Node.js',
    users: ['user1', 'user2'],
    config: {port: 3000, https: true}
};

console.log('Original data:', data);

// Pack and unpack
const binary = packer.pack(data);
console.log('Binary length:', binary.byteLength, 'bytes');

const unpacked = packer.unpack(binary);
console.log('Unpacked data:', unpacked);

// Base64 example
const base64 = BinaryPack.bufferToBase64(binary);
console.log('Base64 length:', base64.length, 'chars');

const fromBase64 = BinaryPack.base64ToBuffer(base64);
const fromBase64Unpacked = packer.unpack(fromBase64);
console.log('From Base64:', fromBase64Unpacked);
```

### Браузер (глобальная переменная)
```html
<script src="https://cdn.jsdelivr.net/npm/binary-pack-js@latest/dist/binary-pack.umd.min.js"></script>
<script>
    // Example usage
    const {BinaryPack, AvailableMethodsName} = window.BinaryPackPackage
    const packer = new BinaryPack('my-secret', AvailableMethodsName.XOR);
    const data = { message: 'Hello Browser!', timestamp: Date.now() };

    // Pack data
    const binary = packer.pack(data);
    console.log('Packed data:', binary);

    // Convert to Base64 for display
    const base64 = BinaryPack.bufferToBase64(binary);
    document.write('<p>Base64: ' + base64 + '</p>');

    // Unpack data
    const unpacked = packer.unpack(binary);
    document.write('<p>Unpacked: ' + JSON.stringify(unpacked) + '</p>');
</script>
```

## Методы шифрования

Библиотека поддерживает три метода шифрования:

- **XOR** - максимальная производительность, базовая защита
  - Скорость: ⚡⚡⚡⚡⚡ (95% от базовой производительности)
  - Безопасность: ⭐⭐
  - Использование: Для максимальной производительности
  - `const packer = new BinaryPack('secret', 'xor');`
- **Caesar** - баланс скорости и безопасности
  - Скорость: ⚡⚡⚡⚡ (80% от базовой производительности)
  - Безопасность: ⭐⭐⭐
  - Использование: Баланс скорости и безопасности
  - `const packer = new BinaryPack('secret', 'caesar');`
- **AES-like** - максимальная безопасность (упрощенная реализация)
  - Скорость: ⚡⚡⚡ (60% от базовой производительности)
  - Безопасность: ⭐⭐⭐⭐
  - Использование: Максимальная безопасность
  - `const packer = new BinaryPack('secret', 'aes-like');`

### Важное примечание:
Метод `AES-like` не является реализацией стандартного AES алгоритма, а представляет собой упрощенную версию с тремя раундами преобразований для образовательных целей.

Все методы обеспечивают базовую защиту. Для критически важных данных рекомендуется использовать специализированные криптографические библиотеки.

### Обработка ошибок:
Библиотека предоставляет детализированные ошибки:
```javascript
try {
    const packer = new BinaryPack('secret', 'aes-like');
    const data = packer.unpack(invalidBuffer);
} catch (error) {
    console.error('Error:', error.message);
    // Возможные ошибки:
    // - "Неподдерживаемый метод шифрования"
    // - "Неверная версия формата данных"
    // - "Несоответствие методов шифрования" 
    // - "Некорректная длина данных"
    // - "Ошибка распаковки данных"
}
```

## API

### `new BinaryPack(secret, encryptionMethod)`
Создает экземпляр BinaryPack.

- `secret` - секретный ключ (строка, опционально)
- `encryptionMethod` - метод шифрования: 'xor', 'caesar', 'aes-like' или `null`

### `pack(data)`
Упаковывает данные в бинарный формат.

- `data` - любые JSON-совместимые данные
- Возвращает: `ArrayBuffer`

### `unpack(buffer)`
Распаковывает данные из бинарного формата.

- `buffer` - бинарные данные (`ArrayBuffer`)
- Возвращает: исходные данные

### `BinaryPack.bufferToBase64(buffer)`
Статический метод для конвертации `ArrayBuffer` в Base64 строку.

### `BinaryPack.base64ToBuffer(base64)`
Статический метод для конвертации Base64 строки обратно в `ArrayBuffer`.

## Примеры

### Сетевая передача данных
```javascript
// Клиентская сторона
const packer = new BinaryPack('session-key', AvailableMethodsName.XOR);
const data = { action: 'update', payload: { ... } };
const binary = packer.pack(data);

// Отправка через fetch
fetch('/api/data', {
    method: 'POST',
    body: BinaryPack.bufferToBase64(binary)
});

// Серверная сторона (Node.js с Express)
app.post('/api/data', express.raw({ type: '*/*' }), (req, res) => {
    const buffer = BinaryPack.base64ToBuffer(req.body.toString());
    const data = packer.unpack(buffer);
    // Обработка данных...
});
```

### Локальное хранилище
```javascript
// Сохранение в localStorage
const packer = new BinaryPack('local-storage-key', AvailableMethodsName.CAESAR);
const userData = { preferences: { ... }, history: [...] };
const binary = packer.pack(userData);
localStorage.setItem('userData', BinaryPack.bufferToBase64(binary));

// Загрузка из localStorage
const storedBase64 = localStorage.getItem('userData');
if (storedBase64) {
    const buffer = BinaryPack.base64ToBuffer(storedBase64);
    const userData = packer.unpack(buffer);
}
```

## Поддержка Node.js
Для использования в Node.js требуется версия 8.0.0 или выше. Библиотека автоматически включает необходимые полифиллы для работы с бинарными данными.

## Производительность
Библиотека оптимизирована для работы с большими объемами данных. Все методы шифрования реализованы с минимальными накладными расходами.

Бенчмарки на различных объемах данных (операций в секунду):

| Метод           | 1 KB  | 10 KB | 100 KB | 1 MB |
|-----------------|-------|-------|--------|------|
| Без шифрования  | 54568 | 7999  | 1162   | 120  |
| XOR             | 13634 | 1951  | 215    | 21   |
| Caesar          | 15294 | 3613  | 400    | 39   |
| AES-like        | 12456 | 5599  | 540    | 53   |

## Браузерная поддержка

- Chrome 38+
- Firefox 34+
- Safari 10+
- Edge 79+
- Node.js 8+

## Лицензия

MIT License - подробности в файле LICENSE.

---

## Вклад в разработку
1. Форкните репозиторий
2. Создайте feature branch: git checkout -b feature/new-feature
3. Закоммитьте изменения: git commit -am 'Add new feature'
4. Запушьте ветку: git push origin feature/new-feature
5. Создайте Pull Request

## Тестирование
```bash
npm run test
```

## Проверка производительности
```bash
npm run benchmark
```

## Безопасность
Для критически важных данных рекомендуется:

 - Использовать длинные сложные ключи (32+ символов)
 - Регулярно менять ключи шифрования
 - Использовать AES-like метод для максимальной безопасности
 - Дополнительно использовать HTTPS для сетевой передачи

## Поддержка
- Баг-репорты: [GitHub Issues](https://github.com/asdev-team/binary-pack-js/issues)
- Вопросы: [Discussions](https://github.com/asdev-team/binary-pack-js/discussions)

BinaryPack - универсальное решение для бинарной сериализации данных с гибкими настройками безопасности и отличной производительностью.