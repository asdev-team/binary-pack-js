import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import fs from 'fs';

// Имя пакета для UMD сборки
const packageName = 'BinaryPackPackage';
// Имя файла для экспорта
const fileName = 'binary-pack';

// Общие настройки для минификации
const terserOptions = {
    ecma: 2020,
    module: true,
    toplevel: true,
    compress: {
        passes: 2,
        drop_console: false, // Не удалять console.log (можно изменить на true для production)
        drop_debugger: true
    },
    mangle: {
        properties: false,
        keep_fnames: false
    },
    format: {
        comments: false
    }
};

// Базовые настройки для всех форматов
const baseConfig = {
    input: 'src/index.js',
    plugins: [
        alias({
            entries: [
                { find: 'buffer', replacement: 'buffer/' },
                { find: 'util', replacement: 'util/util.js' }
            ]
        }),
        nodeResolve(), // Разрешение модулей из node_modules
        commonjs(), // Преобразование CommonJS в ES6
        json(), // Поддержка импорта JSON файлов
        {
            name: 'copy-types',
            buildEnd() {
                // Копирование файлов типов в dist
                fs.copyFileSync('types/index.d.ts', 'dist/index.d.ts');
                fs.copyFileSync('types/global.d.ts', 'dist/global.d.ts');
            }
        }
    ],
};

// Конфигурация для разных форматов вывода
const configs = [
    // ES модуль (для современных сборщиков и браузеров с поддержкой ES модулей)
    {
        ...baseConfig,
        output: {
            file: `dist/${fileName}.esm.js`,
            format: 'esm',
            sourcemap: true,
        },
    },
    // ES модуль минифицированный
    {
        ...baseConfig,
        output: {
            file: `dist/${fileName}.esm.min.js`,
            format: 'esm',
            sourcemap: true,
            plugins: [terser(terserOptions)],
        },
    },
    // CommonJS (для Node.js)
    {
        ...baseConfig,
        output: {
            file: `dist/${fileName}.cjs.js`,
            format: 'cjs',
            exports: 'named',
            name: packageName,
            sourcemap: true,
        },
    },
    // CommonJS минифицированный
    {
        ...baseConfig,
        output: {
            file: `dist/${fileName}.cjs.min.js`,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            name: packageName,
            plugins: [terser(terserOptions)],
        },
    },
    // UMD (для браузеров через тег script)
    {
        ...baseConfig,
        output: {
            file: `dist/${fileName}.umd.js`,
            format: 'umd',
            name: packageName,
            sourcemap: true,
        },
    },
    // UMD минифицированный
    {
        ...baseConfig,
        output: {
            file: `dist/${fileName}.umd.min.js`,
            format: 'umd',
            name: packageName,
            sourcemap: true,
            plugins: [terser(terserOptions)],
        },
    },
];

export default configs;