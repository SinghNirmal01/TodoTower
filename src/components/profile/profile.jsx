import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faUser, faClone} from '@fortawesome/free-solid-svg-icons';
// import '../../Debug.css';

import {useProfile} from '../../contexts/ProfileContext.js';

const Profile = () => {
	const {
		totalTodos,
		setTotalTodos,
		activeTodos,
		setActiveTodos,
		completedTodos,
		deletedTodos,
		userid,
		setUser
	} = useProfile();

	useEffect(() => {
		if (userid !== false) {
			localStorage.setItem('UserId', JSON.stringify(userid));
		}
	}, [userid]);

	return (
		<div className='w-fu bg-gray-900 min-h-[calc(100dvh-100px)] py-6 '>
			<div className=' bg-gray-600 p-4 rounded-[30%] flex flex-col justify-center items-center w-fit m-auto '>
				<FontAwesomeIcon
					icon={faUser}
					size={'50px'}
					style={{color: '#fff', fontSize: '100px'}}
				/>
			</div>
			<div className='w-full p-1 text-center text-xl text-emerald-400 relative'>
				<div className=''> user </div>
				<div className='flex items-center gap-2 absolute text-[0.5em] top-6 left-[50%] -translate-x-1/2 '>
					<p> #{userid}</p>

					<FontAwesomeIcon
						onClick={() => {
							navigator.clipboard.writeText(userid);
						}}
						icon={faClone}
					/>
				</div>
			</div>

			<div className='text-white  grid grid-cols-2 p-2 my-8 text-[10px]'>
				<div className='p-4 text-center m-1 bg-stone-800 rounded border-2 border-teal-500'>
					<h1 className='text-teal-500  my-2'>Total Todo Created</h1>
					<p className='text-black border-2 border-teal-400 rounded-xl bg-green-300'>
						{totalTodos}
					</p>
				</div>
				<div className='p-4 text-center m-1 bg-stone-800 rounded   border-2 border-teal-500'>
					<h1 className='text-teal-500 my-2'>Current Todos</h1>
					<p className='text-black border-2 border-teal-400 rounded-xl bg-green-300'>
						{activeTodos}
					</p>
				</div>
				<div className='p-4 text-center m-1 bg-stone-800 rounded border-2 border-teal-500'>
					<h1 className='text-teal-500  my-2'>
						Total Completed Todos
					</h1>
					<p className='text-black border-2 border-teal-400 rounded-xl bg-green-300'>
						{completedTodos}
					</p>
				</div>
				<div className='p-4 text-center m-1 bg-stone-800 rounded border-2 border-teal-500'>
					<h1 className='text-teal-500  my-2'>Total Todo deleted</h1>
					<p className='text-black border-2 border-teal-400 rounded-xl bg-green-300'>
						{deletedTodos}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
