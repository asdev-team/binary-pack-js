import {BinaryPack, AvailableMethodsName} from '../dist/binary-pack.esm.js';

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