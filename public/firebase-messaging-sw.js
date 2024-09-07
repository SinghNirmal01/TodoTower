importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

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

messaging.onBackgroundMessage(function (payload) {
	alert('Received background message ', payload);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/to-do-list.png'
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
