// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  output: [
    { file: 'dist/index.js', format: 'cjs', sourcemap: true },
    { file: 'esm/index.js', format: 'esm', sourcemap: true }
  ],
  external: ['react', 'react-native', 'expo'],
  plugins: [
    resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true })
  ]
};