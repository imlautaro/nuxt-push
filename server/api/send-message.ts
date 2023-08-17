import { serverSupabaseClient } from '#supabase/server'
import webpush from 'web-push'

export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig()

	webpush.setVapidDetails(
		'mailto:hi@imlautaro.com',
		runtimeConfig.public.vapidPublicKey,
		runtimeConfig.vapidPrivateKey
	)

	const supabase = serverSupabaseClient(event)

	const { data } = await supabase.from('subscriptions').select('*')

	if (!data) return

	await Promise.all(
		// @ts-ignore
		data.map(subscription => {
			webpush.sendNotification(
				subscription?.push_subscription,
				JSON.stringify({
					notification: {
						title: 'Example title',
						body: 'The body',
					},
				})
			)
		})
	)
})
