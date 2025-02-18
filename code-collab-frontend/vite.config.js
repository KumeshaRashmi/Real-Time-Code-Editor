// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react()],
//     server: {
//     proxy: {
//       "/api": "http://192.168.157.121:8080",
//     },
//   },
// })



import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": "http://192.168.157.121:8080",
    },
    host: "0.0.0.0",  
    allowedHosts: [
      "e5b4-212-104-231-216.ngrok-free.app", 
    ],
  },
})
