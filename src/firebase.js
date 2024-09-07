import {initializeApp} from 'firebase/app';
import {getMessaging} from 'firebase/messaging';

const firebaseConfig = {
	apiKey: 'AIzaSyCqPIVSTVCLQhK3FjwNzZbI_IWZbSMdlT0',
	authDomain: 'todotower-3999.firebaseapp.com',
	projectId: 'todotower-3999',
	storageBucket: 'todotower-3999.appspot.com',
	messagingSenderId: '1019215854806',
	appId: '1:1019215854806:web:b4a278ce8e9d1bbe33dd77',
	measurementId: 'G-01WNTBV3YP'
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)