import React, {useState, useEffect} from 'react';
import AddBar from './AddBar.jsx';
import Todos from './Todos.jsx';
import {TodoProvider} from '../../contexts/TodoContext.js';
import {useProfile} from '../../contexts/ProfileContext.js';
const Home = () => {
	const {completedTodos, setCompletedTodos, deletedTodos, setDeletedTodos} =
		useProfile();

	const [todos, settodos] = useState(() => {
		const savedTodos = JSON.parse(localStorage.getItem('Todos'));
		return savedTodos || [];
	});

	/*const completeTodo = id => {
		const updatedTodos = todos.map(todo =>
			todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
		);
		settodos(updatedTodos);
	};*/
	const checkTodo = id => {
		const updatedTodos = todos.map(todo => {
			if (todo.id === id) {
				return {...todo, isCompleted: true};
			} else {
				return todo;
			}
		});
		// Update the todos state
		settodos(updatedTodos);

		setCompletedTodos(prev => prev + 1);
		localStorage.setItem(
			'CompletedTodos',
			JSON.stringify(completedTodos + 1)
		);
	};
	const unCheckTodo = id => {
		const updatedTodos = todos.map(todo => {
			if (todo.id === id) {
				return {...todo, isCompleted: false};
			} else {
				return todo;
			}
		});
		// Update the todos state
		settodos(updatedTodos);
		setCompletedTodos(prev => prev - 1);
		localStorage.setItem(
			'CompletedTodos',
			JSON.stringify(completedTodos + 1)
		);
	};

	const deleteTodo = id => {
		const updatedTodos = todos.filter(todo => todo.id !== id);

		
		settodos(updatedTodos);
		setDeletedTodos(prev => prev + 1);
		localStorage.setItem('DeletedTodos', JSON.stringify(deletedTodos + 1));
	};

	const updateTodo = (id, newtext) => {
		const updatedTodos = todos.map(todo =>
			todo.id === id ? {...todo, text: newtext} : todo
		);
		settodos(updatedTodos);
	};

	const toggleDeleteable = id => {
		const updatedTodos = todos.map(todo =>
			todo.id === id ? {...todo, isDeleteable: !todo.isDeleteable} : todo
		);
		settodos(updatedTodos);
	};

	const toggleEditable = id => {
		const updatedTodos = todos.map(todo =>
			todo.id === id ? {...todo, isEditable: !todo.isEditable} : todo
		);
		settodos(updatedTodos);
	};

	return (
		<TodoProvider
			value={{
				todos,
				settodos,
				checkTodo,
				unCheckTodo,
				deleteTodo,
				updateTodo,
				toggleDeleteable,
				toggleEditable
			}}
		>
			<div className='bg-zinc-900 min-h-[calc(100dvh-100px)]'>
				<AddBar />

				<Todos />
			</div>
		</TodoProvider>
	);
};

export default Home;
