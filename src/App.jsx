import React from 'react';
import {useState , useEffect} from 'react';
import { messaging } from './firebase';

import Navbar from './components/Navbar.jsx';
import Home from './components/app/Home.jsx';
import Footer from './components/Footer.jsx';
import Profile from './components/profile/profile.jsx';
import './style.css';
import Setting from './components/settings/setting.jsx';
import {FileProvider} from './contexts/ActiveFileContext.js';
import {ProfileProvider} from './contexts/ProfileContext.js';
//import './Debug.css'
const App = () => {
	const requestPermission = async () => {
		try {
			const permission = await Notification.requestPermission();
			if (permission === 'granted') {
				console.log('Notification permission granted.');
				// Get FCM token here if needed
			} else {
				console.log('Notification permission denied.');
			}
		} catch (error) {
			console.error('Error requesting notification permission', error);
		}
	};

	useEffect(() => {
		requestPermission();
	}, []);

	const [currentFile, setCurrentFile] = useState('Home');

	const [totalTodos, setTotalTodos] = useState(() => {
		return Number(localStorage.getItem('TotalTodos')) || 0;
	});

	const [activeTodos, setActiveTodos] = useState(() => {
		return Number(localStorage.getItem('ActiveTodos')) || 0;
	});
	const [completedTodos, setCompletedTodos] = useState(() => {
		return Number(localStorage.getItem('CompletedTodos')) || 0;
	});
	const [deletedTodos, setDeletedTodos] = useState(() => {
		return Number(localStorage.getItem('DeletedTodos')) || 0;
	});

	const [userid, setUserid] = useState(() => {
		return Number(localStorage.getItem('UserId')) || Date.now();
	});

	return (
		<ProfileProvider
			value={{
				totalTodos,
				setTotalTodos,
				activeTodos,
				setActiveTodos,
				completedTodos,
				setCompletedTodos,
				deletedTodos,
				setDeletedTodos,
				userid,
				setUserid
			}}
		>
			<FileProvider value={{currentFile, setCurrentFile}}>
				<Navbar />
				<div
					className={`${currentFile === 'Home' ? 'block' : 'hidden'}`}
				>
					<Home />
				</div>
				<div
					className={`${
						currentFile === 'Profile' ? 'block' : 'hidden'
					}`}
				>
					<Profile />
				</div>
				<div
					className={`${
						currentFile === 'Setting' ? 'block' : 'hidden'
					}`}
				>
					<Setting />
				</div>
				<Footer />
			</FileProvider>
		</ProfileProvider>
	);
};

export default App;
