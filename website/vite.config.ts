import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import obfuscator from "vite-plugin-javascript-obfuscator";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", {}]],
      },
    }),
    obfuscator({
      include: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.jsx", "src/**/*.js"],
      exclude: [/node_modules/],
      apply: "build", // Only apply in production builds
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false, // Set to true for extra protection (may impact performance)
        debugProtectionInterval: 0,
        disableConsoleOutput: true,
        identifierNamesGenerator: "hexadecimal",
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ["base64"],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: "function",
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false, // Disable source maps in production
    minify: "terser", // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug", "console.trace"],
      },
      mangle: {
        toplevel: true,
        safari10: true,
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Three.js and WebGL dependencies
          'three': ['three', '@react-three/fiber', 'its-fine'],
          // Separate OGL for Aurora component
          'ogl': ['ogl'],
          // Separate Nivo charts into their own chunk
          'nivo': [
            '@nivo/bar',
            '@nivo/pie',
            '@nivo/line',
            '@nivo/radar',
            '@nivo/bump',
            '@nivo/calendar',
            '@nivo/heatmap',
            '@nivo/sunburst',
            '@nivo/treemap',
            '@nivo/funnel',
            '@nivo/sankey',
            '@nivo/radial-bar',
            '@nivo/waffle',
            '@nivo/scatterplot',
            '@nivo/chord',
            '@nivo/network',
            '@nivo/parallel-coordinates',
          ],
          // Separate Motion/Framer Motion
          'motion': ['motion/react', 'framer-motion'],
          // Separate Material UI
          'mui': ['@mui/material', '@mui/icons-material'],
          // Vendor chunk for other large dependencies
          'vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://traverse-backend-api.azurewebsites.net',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
