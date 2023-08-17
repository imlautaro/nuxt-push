<script setup lang="ts">
const askPermission = () => {
	return new Promise((resolve, reject) => {
		const permissionResult = Notification.requestPermission(result =>
			resolve(result)
		)

		if (permissionResult) {
			permissionResult.then(resolve, reject)
		}
	}).then(result => result === 'granted')
}

const supabase = useSupabaseClient()

const subscribe = async () => {
	if (!('serviceWorker' in navigator)) return
	if (!('PushManager' in window)) return
	const permission = await askPermission()
	if (permission) {
		const registration = await navigator.serviceWorker.register(
			'/service-worker.js'
		)
		const subscription = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: useRuntimeConfig().public.vapidPublicKey,
		})
		console.log('a')
		const { data, error } = await supabase.from('subscriptions').insert({
			// @ts-ignore
			push_subscription: subscription,
		})
		if (error) {
			console.error(error)
		}
	} else {
		console.log('Notification permission denied.')
	}
}
</script>

<template>
	<div>
		<h1>Hello world from Nuxt 3!</h1>
		<button @click="subscribe">Subscribe</button>
	</div>
</template>
