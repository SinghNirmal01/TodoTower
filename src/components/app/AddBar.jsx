import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';

import {useTodo} from '../../contexts/TodoContext.js';
import {useProfile} from '../../contexts/ProfileContext.js';

const AppBar = () => {
	const [todotext, settodotext] = useState('');

	const {todos, settodos} = useTodo();
	const {totalTodos, setTotalTodos} = useProfile();
	function handleSubmit() {
		if (todotext != '') {
			settodos([
				{
					id: Date.now(),
					text: todotext,
					isCompleted: false,
					isDeleteable: false,
					isEditable: false
				},
				...todos
			]);
			setTotalTodos(prev => prev + 1);
			localStorage.setItem('TotalTodos', JSON.stringify(totalTodos + 1));
		}
		settodotext('');
	}

	return (
		// <div className=' w-screen bg-[#dde6f0] min-h-[100px]'>
		<div className='w-[65vw] max-w-sm relative m-auto py-5 '>
			<input
				onChange={e => {
					settodotext(e.target.value);
				}}
				value={todotext}
				placeholder='Enter Your Todo...'
				className='w-[100%] bg-green-100 p-2 rounded-full border-2 border-gray-500 focus:outline-blue-300  focus:border-2 focus:border-blue-400'
				type='text'
			/>
			<div
				onClick={handleSubmit}
				className='inline absolute right-2 top-1/2 -translate-y-1/2 bg-black rounded-full '
			>
				<FontAwesomeIcon
					className='scale-125'
					icon={faCirclePlus}
					size='xl'
					style={{color: 'hsl(158, 90.4%, 51.6%)'}}
				/>
			</div>
		</div>
		//	</div>
	);
};

export default AppBar;
