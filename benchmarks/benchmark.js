import {BinaryPack, AvailableMethodsName} from '../dist/binary-pack.esm.js';

function generateTestData(size) {
    const data = {
        timestamp: Date.now(),
        values: []
    };

    const itemsCount = Math.ceil(size / 100);

    for (let i = 0; i < itemsCount; i++) {
        data.values.push({
            id: i,
            name: `Item ${i}`,
            value: Math.random() * 1000,
            description: 'x'.repeat(50)
        });
    }

    return data;
}

function runBenchmark() {
    const testSizes = [1024, 10240, 102400, 1024000];
    const methods = [null, ...Object.values(AvailableMethodsName)];
    const iterations = 100;

    console.log('Running BinaryPack benchmark...\n');

    methods.forEach(method => {
        const methodName = method || 'none';
        console.log(`Method: ${methodName}`);
        console.log('='.repeat(40));

        testSizes.forEach(size => {
            const testData = generateTestData(size);

            const packer = method ? new BinaryPack('benchmark-secret', method) : new BinaryPack();

            let totalTime = 0;
            let successfulOps = 0;

            for (let i = 0; i < iterations; i++) {
                try {
                    const start = performance.now();
                    const packed = packer.pack(testData);
                    packer.unpack(packed);
                    const end = performance.now();

                    totalTime += end - start;
                    successfulOps++;
                } catch (error) {
                    // Ignore errors for benchmark
                }
            }

            const avgTime = totalTime / successfulOps;
            const opsPerSec = successfulOps > 0 ? 1000 / avgTime : 0;

            console.log(`Size: ${size} bytes`);
            console.log(`Avg time: ${avgTime.toFixed(2)}ms`);
            console.log(`Ops/sec: ${Math.round(opsPerSec)}`);
            console.log(`Success rate: ${(successfulOps / iterations * 100).toFixed(1)}%`);
            console.log('-'.repeat(30));
        });

        console.log('\n');
    });
}

runBenchmark();