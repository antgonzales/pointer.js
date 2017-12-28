import resolve from 'rollup-plugin-node-resolve'

export default {
  name: 'Pointer.js',
  input: 'src/Pointer.js',
  output: {
    file: 'dist/umd/pointer.js',
    format: 'umd'
  },
  plugins: [
    resolve()
  ]
}
