import { defineConfig } from 'tsup';
import { execSync } from 'node:child_process';
import vue from 'esbuild-plugin-vue-next';

export default defineConfig({
  entry: ['cli.ts'],
  format: ['esm'],
  target: 'node22',
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: false,
  esbuildPlugins: [vue()],
  dts: true,
  async onSuccess() {
    execSync('cp -R src/common dist/');
    execSync('cp -R src/stubs dist/stubs');
    execSync('cp -R src/domain dist/domain');
  }
});
