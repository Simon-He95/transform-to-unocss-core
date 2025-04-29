import { defineConfig } from 'tsdown'

export default defineConfig({
  target: 'node14',
  format: ['cjs', 'esm', 'iife', 'umd'],
  platform: 'node', // 明确指定为 Node.js 平台
  globalName: 'TransformToUnoCSSCore',
})
