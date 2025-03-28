import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				presets: ['jotai/babel/preset'],
			},
		}),
		tailwindcss(),
	],
	server: {
		proxy: {
			'/api': 'http://localhost:5191',
			'/auth/login': {
				target: 'http://localhost:5191',
				secure: true,
				rewrite: (path) => path.replace(/^\/auth/, ''),
			},
		},
	},
})
