import React, {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
	faSun,
	faMoon,
	faGear,
	faUser,
	faHouse,
	faXmark
} from '@fortawesome/free-solid-svg-icons';
import {useFile} from '../contexts/ActiveFileContext.js';

const Navbar = () => {
	const {currentFile, setCurrentFile} = useFile();

	const [hidden, sethidden] = useState(false);
	function toogleHidden() {
		sethidden(!hidden);
	}
	return (
		<>
			<div className='w-screen bg-emerald-400 p-4 flex items-center justify-between '>
				<div className=' w-6 h-6 grid place-items-center'>
					<FontAwesomeIcon
						className={`  ${
							currentFile === 'Home' ? 'block' : 'hidden'
						}`}
						onClick={() => {
							setCurrentFile('Profile');
						}}
						icon={faUser}
					/>
					<FontAwesomeIcon
						className={` ${
							currentFile === 'Home' ? 'hidden' : 'block'
						}`}
						onClick={() => {
							setCurrentFile('Home');
						}}
						icon={faHouse}
					/>
				</div>

				<div className=''>TodoTower</div>

				<div className='flex justify-between  w-12'>
					<div className=' flex justify-center items-center'>
						<FontAwesomeIcon
							className={`${
								currentFile === 'Setting' ? 'hidden' : 'block'
							}`}
							onClick={() => {
								setCurrentFile('Setting');
							}}
							icon={faGear}
						/>
						<FontAwesomeIcon
							className={`${
								currentFile === 'Setting' ? 'blocl' : 'hidden'
							}`}
							onClick={() => {
								setCurrentFile('Home');
							}}
							icon={faXmark}
							size={"xl"}
						/>
					</div>
					<div
						className={`flex justify-center items-center  ${
							hidden ? 'hidden' : 'block'
						}`}
						onClick={() => {
							sethidden(true);
						}}
					>
						<FontAwesomeIcon icon={faSun} />
					</div>

					<div
						className={`flex justify-center items-center   ${
							hidden ? 'block' : 'hidden'
						}`}
						onClick={() => {
							sethidden(false);
						}}
					>
						<FontAwesomeIcon icon={faMoon} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
