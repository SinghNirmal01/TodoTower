import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faBan, faRectangleXmark} from '@fortawesome/free-solid-svg-icons';
import {useProfile} from '../../contexts/ProfileContext.js';
import {useFile} from '../../contexts/ActiveFileContext.js';
// import '../../Debug.css';

const setting = () => {
	const {userid} = useProfile();
	const {currentFile} = useFile();
	const [hidden, setHidden] = useState(true);
	const [warning, setWarning] = useState(false);

	const [password, setpassword] = useState('');

	useEffect(() => {
		setHidden(true);
		setpassword('');
	}, [currentFile]);
	return (
		<div className='w-full min-h-screen p-4 bg-gray-900 relative '>
			<div
				className={`m-auto border-2 border-rose-500  w-[80%] p-2 text-red-600 text-center rounded-xl bg-stone-800 max-w-xl `}
			>
				<button
					className={`m-auto ${hidden ? 'block' : 'hidden'}`}
					onClick={() => {
						setHidden(!hidden);
					}}
				>
					clear all data
				</button>

				<div
					className={`relative flex flex-col gap-2 items-cenyer p-6 ${
						hidden ? 'hidden' : 'block'
					}`}
				>
					<div>
						<input
							className='w-[100%] rounded-xl bg-stone-800 border-red-400 border-2 p-2 text-orange-600 text-[1em] text-center focus:outline-0 '
							onChange={e => {
								setpassword(e.target.value);
								if (e.target.value == userid) {
									setWarning(false);
									e.target.style.color =
										'hsl(160, 84.1%, 39.4%)';
								} else {
									setWarning(true);
									e.target.style.color =
										'hsl(0, 72.2%, 50.6%)';
								}
							}}
							value={password}
							placeholder='Your User-Id'
						/>
						<p
							className={`absolute left-[50%] -translate-x-1/2 text-center text-red-500 text-[0.5em] ${
								warning ? 'block' : 'hidden'
							}`}
						>
							id not match
						</p>
					</div>
					<div className='flex m-auto mt-4  gap-4'>
						<button
							onClick={() => {
								if (password == userid) {
									localStorage.clear();
									window.location.reload();
									setHidden(!hidden);
									setpassword('');
								} else {
									setWarning(!warning);
								}
							}}
						>
							<FontAwesomeIcon
								icon={faBan}
								size={'xl'}
							/>
							<p className='text-[0.5em]'>delete</p>
						</button>
						<button
							onClick={() => {
								setHidden(!hidden);
								setpassword('');
							}}
						>
							<FontAwesomeIcon
								style={{color: '#09ff29'}}
								icon={faRectangleXmark}
								size={'xl'}
							/>
							<p className='text-[0.5em] text-[#09ff29] '>
								cancle
							</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default setting;
