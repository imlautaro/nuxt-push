// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	build: {
		transpile: ['web-push'],
	},
	devtools: { enabled: true },
	runtimeConfig: {
		vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
		public: {
			vapidPublicKey: process.env.VAPID_PUBLIC_KEY,
		},
	},
	modules: ['@nuxtjs/supabase'],
})
