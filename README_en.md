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

[Русский](./README.md) | **English**

---

JavaScript library for binary data serialization with encryption support. Packs any JSON-compatible data into binary format with the ability to use various encryption algorithms.

## Features
- 📦 Serialize any JSON-compatible data into binary format
- 🔒 Multiple encryption methods (XOR, Caesar, AES-like)
- ⚡ High performance with minimal overhead
- 📡 Network transfer ready with Base64 conversion
- 🛡️ Built-in data validation and error handling
- 🔧 Full TypeScript support

## Installation

### NPM
```bash
npm install binary-pack-js
```

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/binary-pack-js@latest/dist/binary-pack.umd.min.js"></script>
```

## Usage

### ES Modules (Modern Applications)
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

### Browser (Global Variable)
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

## Encryption Methods

The library supports three encryption methods:

- **XOR** - Maximum performance, basic protection
  - Speed: ⚡⚡⚡⚡⚡ (95% of baseline performance)
  - Security: ⭐⭐
  - Use case: Maximum performance
  - `const packer = new BinaryPack('secret', 'xor');`
- **Caesar** - Balance of speed and security
  - Speed: ⚡⚡⚡⚡ (80% of baseline performance)
  - Security: ⭐⭐⭐
  - Use case: Balanced approach
  - `const packer = new BinaryPack('secret', 'caesar');`
- **AES-like** - Maximum security (simplified implementation)
  - Speed: ⚡⚡⚡ (60% of baseline performance)
  - Security: ⭐⭐⭐⭐
  - Use case: Maximum security
  - `const packer = new BinaryPack('secret', 'aes-like');`

### Important Note:
The `AES-like` method is not a standard AES algorithm implementation, but a simplified version with three transformation rounds for educational purposes.

All methods provide basic protection. For critically important data, it's recommended to use specialized cryptographic libraries.

### Error Handling:
The library provides detailed errors:
```javascript
try {
    const packer = new BinaryPack('secret', 'aes-like');
    const data = packer.unpack(invalidBuffer);
} catch (error) {
    console.error('Error:', error.message);
    // Possible errors:
    // - "Unsupported encryption method"
    // - "Invalid data format version"
    // - "Encryption method mismatch"
    // - "Invalid data length"
    // - "Data unpacking error"
}
```

## API

### `new BinaryPack(secret, encryptionMethod)`
Creates a BinaryPack instance.

- `secret` - secret key (string, optional)
- `encryptionMethod` - encryption method: 'xor', 'caesar', 'aes-like' or `null`

### `pack(data)`
Packs data into binary format.

- `data` - any JSON-compatible data
- Returns: `ArrayBuffer`

### `unpack(buffer)`
Unpacks data from binary format.

- `buffer` - binary data (`ArrayBuffer`)
- Returns: original data

### `BinaryPack.bufferToBase64(buffer)`
Static method to convert `ArrayBuffer` to Base64 string.

### `BinaryPack.base64ToBuffer(base64)`
Static method to convert Base64 string back to `ArrayBuffer`.

## Examples

### Network Data Transfer
```javascript
// Client side
const packer = new BinaryPack('session-key', AvailableMethodsName.XOR);
const data = { action: 'update', payload: { ... } };
const binary = packer.pack(data);

// Send via fetch
fetch('/api/data', {
    method: 'POST',
    body: BinaryPack.bufferToBase64(binary)
});

// Server side (Node.js with Express)
app.post('/api/data', express.raw({ type: '*/*' }), (req, res) => {
    const buffer = BinaryPack.base64ToBuffer(req.body.toString());
    const data = packer.unpack(buffer);
    // Process data...
});
```

### Local Storage
```javascript
// Save to localStorage
const packer = new BinaryPack('local-storage-key', AvailableMethodsName.CAESAR);
const userData = { preferences: { ... }, history: [...] };
const binary = packer.pack(userData);
localStorage.setItem('userData', BinaryPack.bufferToBase64(binary));

// Load from localStorage
const storedBase64 = localStorage.getItem('userData');
if (storedBase64) {
    const buffer = BinaryPack.base64ToBuffer(storedBase64);
    const userData = packer.unpack(buffer);
}
```

## Node.js Support
Requires Node.js version 8.0.0 or higher. The library automatically includes necessary polyfills for working with binary data.

## Performance
The library is optimized for working with large data volumes. All encryption methods are implemented with minimal overhead.

Benchmarks on various data sizes (operations per second):

| Method           | 1 KB  | 10 KB | 100 KB | 1 MB |
|------------------|-------|-------|--------|------|
| No Encryption    | 54568 | 7999  | 1162   | 120  |
| XOR              | 13634 | 1951  | 215    | 21   |
| Caesar           | 15294 | 3613  | 400    | 39   |
| AES-like         | 12456 | 5599  | 540    | 53   |

## Browser Support

- Chrome 38+
- Firefox 34+
- Safari 10+
- Edge 79+
- Node.js 8+

## License

MIT License - see LICENSE file for details.

---

## Contributing
1. Fork the repository
2. Create a feature branch: git checkout -b feature/new-feature
3. Commit your changes: git commit -am 'Add new feature'
4. Push to the branch: git push origin feature/new-feature
5. Create a Pull Request

## Testing
```bash
npm run test
```

## Performance Benchmarks
```bash
npm run benchmark
```

## Security
For critically important data, it's recommended to:

 - Use long complex keys (32+ characters)
 - Regularly rotate encryption keys
 - Use the AES-like method for maximum security
 - Additionally use HTTPS for network transmission

## Support
- Bug reports: [GitHub Issues](https://github.com/asdev-team/binary-pack-js/issues)
- Questions: [Discussions](https://github.com/asdev-team/binary-pack-js/discussions)

BinaryPack - a universal solution for binary data serialization with flexible security settings and excellent performance.
