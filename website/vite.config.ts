import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", {}]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
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
