import React, {useState, useRef, useEffect} from 'react';
import {useTodo} from '../../contexts/TodoContext.js'; // Import the custom hook to access the todo context
import {useProfile} from '../../contexts/ProfileContext.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faSquare,
	faSquareCheck,
	faTrash,
	faPencil,
	faSquareXmark,
	faCircleCheck
} from '@fortawesome/free-solid-svg-icons';

const Todos = () => {
	// Destructure functions and state variables from the todo context
	const {
		todos,
		settodos,
		checkTodo,
		unCheckTodo,
		deleteTodo,
		updateTodo,
		toggleDeleteable,
		toggleEditable
	} = useTodo();

	const {activeTodos, setActiveTodos, completedTodos, setCompletedTodos} =
		useProfile();

	setActiveTodos(todos.length);

	// State variables to manage UI interactions
	const [clickable, setClickable] = useState(true);
	const [hidden, setHidden] = useState(true);
	const [disable, setDisable] = useState(true);
	const [updateText, setUpdateText] = useState('');
	const [editId, setEditId] = useState(null); // Track the ID of the todo being edited
	const inputRefs = useRef({}); // Reference to the input element for focusing

	useEffect(() => {
		if (editId !== null && inputRefs.current[editId]) {
			inputRefs.current[editId].focus();
		}
	}, [editId, disable]);

	useEffect(() => {
		localStorage.setItem('Todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<div className='w-[90%] p-2 m-auto bg-gray-900 min-h-[200px] rounded-xl border-2 border-gray-500 '>
			<h1 className='w-[40%] m-auto text-xl bg-emerald-400 rounded p-2 text-center  my-5'>
				Your Tower
			</h1>

			{todos.map((todo, index) => (
				<div
					key={todo.id} // Important: Add a unique key for each todo item
					className='p-2 mb-2 bg-green-100 rounded-md flex items-center max-w-xl m-auto relative'
				>
					<div>
						{/* Toggle completion state based on todo.isCompleted */}
						<div
							className={` ${
								todo.isCompleted ? 'hidden' : 'block'
							} `}
							onClick={() => {
								checkTodo(todo.id);
							}}
						>
							<FontAwesomeIcon
								icon={faSquare}
								size='xl'
								style={{color: 'hsl(158, 90.4%, 51.6%)'}}
							/>
						</div>
						<div
							className={`bg-black rounded-full h-4 flex items-center ${
								todo.isCompleted ? 'block' : 'hidden'
							} `}
							onClick={() => {
								unCheckTodo(todo.id);
							}}
						>
							<FontAwesomeIcon
								icon={faSquareCheck}
								size='xl'
								style={{color: 'hsl(158, 90.4%, 51.6%)'}}
							/>
						</div>
					</div>
					<div className='flex items-center justify-between w-full  '>
						<p
							className={` w-[60%] outline-0  ml-4 bg-green-100 outline-0 break-all ${
								todo.isCompleted
									? 'text-green-500 font-bold'
									: 'text-black'
							} `}
						>
							{todo.text}
						</p>

						<div
							className={`flex gap-1  items-center ${
								todo.isDeleteable ? '' : ''
							}`}
						>
							{/* Handle editing of the todo item */}
							<div>
								<FontAwesomeIcon
									onClick={() => {
										if (clickable) {
											toggleEditable(todo.id);
											setClickable(false);
											setHidden(false);
											setUpdateText(todo.text); // Set the current text to the input
											setEditId(todo.id); // Set the ID of the todo being edited
											setTimeout(() => {
												setDisable(false); // Enable input field
											}, 100);
										}
									}}
									icon={faPencil}
									style={{color: '#091eff'}}
								/>
							</div>
							{/* Handle deletion of the todo item */}
							<div>
								<FontAwesomeIcon
									className={` ${
										todo.isDeleteable ? 'hidden' : 'inline'
									} `}
									onClick={() => {
										if (clickable) {
											toggleDeleteable(todo.id); // Toggle deleteable state
											setClickable(!clickable); // Disable other interactions
										}
									}}
									icon={faTrash}
									style={{color: '#ff0000'}}
								/>
							</div>
							{/* Confirm deletion */}
							<div className='bg-black rounded-full h-4 grid content-center'>
								<FontAwesomeIcon
									className={` ${
										todo.isDeleteable ? 'inline' : 'hidden'
									} `}
									onClick={() => {
										setClickable(!clickable); // Enable other interactions
										deleteTodo(todo.id); // Delete the todo
									}}
									icon={faSquareCheck}
									size='xl'
									style={{color: '#14ff00'}}
								/>
							</div>
							{/* Cancel deletion */}
							<div className='bg-black rounded-full h-4 grid content-center'>
								<FontAwesomeIcon
									className={` ${
										todo.isDeleteable ? 'inline' : 'hidden'
									} `}
									onClick={() => {
										setClickable(!clickable); // Enable other interactions
										toggleDeleteable(todo.id); // Revert deleteable state
									}}
									icon={faSquareXmark}
									size='xl'
									style={{color: '#ff0000'}}
								/>
							</div>
						</div>
					</div>

					{/* Edit modal for updating todo text */}
					<div
						className={`text-white w-[100%]  p-4 border border-teal-500  text-center h-[400%] max-h-[200px] bg-black rounded-lg shadow shadow-blue-400  z-10 absolute top-[50%]  left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center ${
							todo.isEditable ? 'block' : 'hidden'
						}`}
					>
						<div>
							<button className=' font-bold text-xl'>Edit</button>
						</div>
						<input
							className=' w-full h-6 rounded-full bg-green-100 focus:outline-0 max-w-sm text-black p-2 text-center'
							onChange={e => {
								setUpdateText(e.target.value); // Update state as user types
							}}
							value={updateText}
							disabled={disable} // Disable input until editing is enabled
							ref={el => (inputRefs.current[todo.id] = el)}
							// Attach ref to focus input when editing starts
						/>
						<div className='my-2 w-full flex justify-center gap-4'>
							{/* Save updated todo text */}
							<button
								className={`${hidden ? 'hidden' : 'inline'}`}
								onClick={() => {
									if (updateText) {
										updateTodo(todo.id, updateText); // Save updated text
										setHidden(true); // Hide editing UI
										setDisable(true); // Disable input field
									}
								}}
							>
								<FontAwesomeIcon
									size='xl'
									icon={faSquareCheck}
									style={{color: '#14ff00'}}
								/>
							</button>

							{/* Cancel editing */}
							<button
								className={`${hidden ? 'hidden' : 'inline'}`}
								onClick={() => {
									setUpdateText(''); // Clear input field
									toggleEditable(todo.id); // Revert editable state
									setClickable(!clickable); // Enable other interactions
									setDisable(true); // Disable input field
								}}
							>
								<FontAwesomeIcon
									size='xl'
									icon={faSquareXmark}
									style={{color: '#ff002f'}}
								/>
							</button>

							{/* Button to exit without changes */}
							<button
								className={`${hidden ? 'inline' : 'hidden'}`}
								onClick={() => {
									setUpdateText(''); // Clear input field
									toggleEditable(todo.id); // Revert editable state
									setClickable(!clickable); // Enable other interactions
									setHidden(false); // Exit without saving changes
									setDisable(true); // Disable input field
								}}
							>
								<FontAwesomeIcon
									size='2xl'
									icon={faSquareXmark}
									style={{color: '#09ff4a'}}
								/>
								<p className='p-2 text-teal-500'>Done!</p>
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Todos;
