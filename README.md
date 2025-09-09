# BinaryPack

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
import { BinaryPack, AvailableMethodsName } from 'binary-pack-js';

const packer = new BinaryPack('my-secret-key', AvailableMethodsName.AES);
const data = { message: 'Hello World', number: 42 };

// Упаковка данных
const binaryData = packer.pack(data);
const base64String = BinaryPack.bufferToBase64(binaryData);

// Распаковка данных
const receivedBuffer = BinaryPack.base64ToBuffer(base64String);
const unpackedData = packer.unpack(receivedBuffer);
```

### CommonJS (Node.js)
```javascript
const { BinaryPack, AvailableMethodsName } = require('binary-pack-js');

const packer = new BinaryPack('my-secret-key', AvailableMethodsName.AES);
// ... аналогичное использование
```

### Браузер (глобальная переменная)
```html
<script src="https://cdn.jsdelivr.net/npm/binary-pack-js@latest/dist/binary-pack.umd.min.js"></script>
<script>
    const packer = new BinaryPack('my-secret-key', window.BinaryPack.AvailableMethodsName.AES);
    const data = { message: 'Hello World' };

    const binary = packer.pack(data);
    const base64 = window.BinaryPack.bufferToBase64(binary);
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