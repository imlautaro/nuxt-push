// receive push message and send a notification
self.addEventListener('push', function (event) {
	console.log(event.data.text())
	event.waitUntil(
		self.registration.showNotification('Hello World!', {
			body: event.data.text(),
		})
	)
})
