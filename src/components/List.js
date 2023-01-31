import React, { useState } from 'react'

// React.memo는 너무자주 랜더링되는것을 최적화 해준다
const List = React.memo(({
	id, title, completed, todoData, setTodoData, provided, snapshot
}) => {

	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);

	const handleClick = (id) => {
    let newTodoData = todoData.filter(data => data.id !== id);
		setTodoData(newTodoData);
		localStorage.setItem('todoData', JSON.stringify(newTodoData))
  }

	const handleCompleteChange = (id) => {
		let newTodoData = todoData.map(data => {
			if(data.id === id) {
				data.completed = !data.completed;
			}
			return data;
		})
  
		setTodoData(newTodoData);
		localStorage.setItem('todoData', JSON.stringify(newTodoData))
	}

	const handleEditChange = (event) => {
		setEditedTitle(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		let newTodoData = todoData.map(data => {
			if(data.id === id) {
				data.title = editedTitle;
			}
			return data;
		})
		setTodoData(newTodoData);
		localStorage.setItem('todoData', JSON.stringify(newTodoData))
		setIsEditing(false);
	}

	if(isEditing) {
		return(
			<div className={`flex items-center justify-between w-full px-4 py-1 my-2 
					text-gray-600 border rounded`}>
				<div className="items-center">
					<form onSubmit={handleSubmit}>
						<input value={editedTitle}
							onChange={handleEditChange}
							className="w-full px-3 py-2 mr-4 text-gray-500 rounded" />
					</form>
				</div>
				<div className="items-center">
					<button onClick={() => setIsEditing(false)}
						className="px-4 py-2 float-right">x</button>
					<button type="submit" onClick={handleSubmit}
						className="px-4 py-2 float-right">save</button>
				</div>
			</div>
		)
	} else {
		return (
			<div key={id} {...provided.draggableProps} ref={provided.innerRef}
				{...provided.dragHandleProps}
				className={`${snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'} 
					flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 
					border rounded`}>
				<div className="items-center">
					<input type="checkbox" defaultChecked={false} 
						onChange={() => handleCompleteChange(id)} />{' '}
					<span className={completed ? 'line-through' : ''}>{title}</span>
				</div>
				<div className="items-center">
					<button onClick={() => handleClick(id)}
						className="px-4 py-2 float-right">x</button>
					<button onClick={() => setIsEditing(true)}
						className="px-4 py-2 float-right">edit</button>
				</div>
			</div>
		)
	}
});

export default List;
