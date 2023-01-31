import React, { useState } from "react";
import './App.css';
import Lists from './components/Lists'
import Form from './components/Form'

const initialTodoData = localStorage.getItem('todoData') 
	? JSON.parse(localStorage.getItem('todoData')) 
	: [];

// 함수형 컴포넌트
export default function App() {
	// npm install
  // npm run start

	const [ todoData, setTodoData ] = useState(initialTodoData);
	const [ value, setValue ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // form안에 input을 전송할때 페이지 리로드를 막아줌

		if(value === '') return;

    let newTodo = {
      id: Date.now(),
      title: value,
      conpleted: false
    };

		setTodoData(prev => [...prev, newTodo]);
		localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]))
		setValue('');
  }

	const handleRemoveAllItems = () => {
		setTodoData([]);
		localStorage.setItem('todoData', JSON.stringify([]))
	}

  return(
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
					<button className="p-1 border rounded"
						onClick={handleRemoveAllItems}> Delete All</button>
        </div>
				
				<Lists todoData={todoData} setTodoData={setTodoData} />

				<Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  )
}