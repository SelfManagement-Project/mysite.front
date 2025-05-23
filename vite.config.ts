import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [
    react(), tsconfigPaths()
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@common', replacement: path.resolve(__dirname, 'src/common') }
    ]
  }
});