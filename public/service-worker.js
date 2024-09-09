importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker
const firebaseConfig = {
	apiKey: 'AIzaSyCqPIVSTVCLQhK3FjwNzZbI_IWZbSMdlT0',
	authDomain: 'todotower-3999.firebaseapp.com',
	projectId: 'todotower-3999',
	storageBucket: 'todotower-3999.appspot.com',
	messagingSenderId: '1019215854806',
	appId: '1:1019215854806:web:b4a278ce8e9d1bbe33dd77',
	measurementId: 'G-01WNTBV3YP'
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage(payload => {
	console.log('Received background message ', payload);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/icons/to-do-list.png' // Set your custom notification icon
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});

const CACHE_NAME = 'offline-assets';
const urlsToCache = [
	'/',
	'/index.html',
	'/static/css/main.css',
	'/static/js/main.js',
	'/icons/to-do-list.png'
];

// Cache assets during the install phase
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
	);
});

// Serve cached content or fetch from the network
self.addEventListener('fetch', event => {
	event.respondWith(
		caches
			.match(event.request)
			.then(response => response || fetch(event.request))
	);
});

// Listen for push events (for FCM notifications)
self.addEventListener('push', event => {
	const data = event.data.json();

	const title = data.notification.title;
	const options = {
		body: data.notification.body,
		icon: '/icons/to-do-list.png' // Set your notification icon
	};

	// Show the notification
	event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
	event.notification.close();
	event.waitUntil(
		clients.openWindow('/') // Adjust the URL if you need to redirect to a specific page
	);
});
