import {BinaryPack, AvailableMethodsName} from '../src/index.js';

function runTests() {
    const ERROR = []
    const SECRET = 'Test Binary Pack'

    console.log('Running BinaryPack tests...\n');

    // Test 1: Basic serialization without encryption
    console.log('Test 1: Basic serialization');
    const basicPacker = new BinaryPack();
    const testData = {message: 'Hello', number: 42, array: [1, 2, 3]};
    const testDataString = JSON.stringify(testData);

    try {
        const packed = basicPacker.pack(testData);
        const unpacked = basicPacker.unpack(packed);
        const unpackedString = JSON.stringify(unpacked);

        if (testDataString === unpackedString) {
            console.log('✓ Basic serialization works');
        } else {
            console.log('✗ Basic serialization failed');
        }

        console.log(`  Original: ${testDataString}`);
        console.log(`  Unpacked: ${unpackedString}`);
    }//
    catch (error) {
        console.error(`✗ Basic serialization failed: ${error.message}`);
        ERROR.push({
            method: 'basic',
            message: error.message,
        })
    }


    // Test 2: XOR encryption
    console.log('\nTest 2: XOR encryption');
    const XorPacker = new BinaryPack(SECRET, AvailableMethodsName.XOR);

    try {
        const packed = XorPacker.pack(testData);
        // console.log(packed);
        const unpacked = XorPacker.unpack(packed);
        const unpackedString = JSON.stringify(unpacked);

        if (testDataString === unpackedString) {
            console.log('✓ XOR encryption works');
        } else {
            console.log('✗ XOR encryption failed');
        }

        console.log(`  Original: ${testDataString}`);
        console.log(`  Unpacked: ${unpackedString}`);
    }//
    catch (error) {
        console.error(`✗ XOR encryption failed: ${error.message}`);
        ERROR.push({
            method: 'xor',
            message: error.message,
        })
    }

    // Test 3: Caesar encryption
    console.log('\nTest 3: Caesar encryption');
    const CaesarPacker = new BinaryPack(SECRET, AvailableMethodsName.CAESAR);

    try {
        const packed = CaesarPacker.pack(testData);
        const unpacked = CaesarPacker.unpack(packed);
        const unpackedString = JSON.stringify(unpacked);

        if (testDataString === unpackedString) {
            console.log('✓ Caesar encryption works');
        } else {
            console.log('✗ Caesar encryption failed');
        }

        console.log(`  Original: ${testDataString}`);
        console.log(`  Unpacked: ${unpackedString}`);

    }//
    catch (error) {
        console.error(`✗ Caesar encryption failed: ${error.message}`);
        ERROR.push({
            method: 'Caesar',
            message: error.message,
        })
    }

    // Test 4: AES-like encryption
    console.log('\nTest 4: AES-like encryption');
    const AesPacker = new BinaryPack(SECRET, AvailableMethodsName.AES);

    try {
        const packed = AesPacker.pack(testData);
        const unpacked = AesPacker.unpack(packed);
        const unpackedString = JSON.stringify(unpacked);

        if (testDataString === unpackedString) {
            console.log('✓ AES-like encryption works');
        } else {
            console.log('✗ AES-like  encryption failed');
        }

        console.log(`  Original: ${testDataString}`);
        console.log(`  Unpacked: ${unpackedString}`);

    }//
    catch (error) {
        console.error(`✗ AES-like encryption failed: ${error.message}`);
        ERROR.push({
            method: 'AES-like',
            message: error.message,
        })
    }

    // Test 5: Base64 conversion
    console.log('\nTest 5: Base64 conversion');
    try {
        const packed = basicPacker.pack(testData);
        const base64 = BinaryPack.bufferToBase64(packed);
        const buffer = BinaryPack.base64ToBuffer(base64);
        const unpacked = basicPacker.unpack(buffer);
        const unpackedString = JSON.stringify(unpacked);

        if (testDataString === unpackedString) {
            console.log('✓ Base64 conversion works');
        } else {
            console.log('✗ Base64 conversion failed');
        }

        console.log(`  Original: ${testDataString}`);
        console.log(`  Unpacked: ${unpackedString}`);

    }//
    catch (error) {
        console.error(`✗ Base64 conversion failed: ${error.message}`);
        ERROR.push({
            method: 'Base64',
            message: error.message,
        })
    }

    // Test 6: Invalid method
    console.log('\nTest 6: Invalid method');

    try {
        new BinaryPack(SECRET, 'md5');
    }//
    catch (error) {
        console.log(`✓ Invalid method: ${error.message}`);
        ERROR.push({
            method: 'md5',
            message: error.message,
        })
    }

    console.log('\nAll tests completed!');
    console.log('\nErrors:', ERROR);
}

runTests();