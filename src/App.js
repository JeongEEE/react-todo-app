import React, { useState } from "react";
import './App.css';

export default function App() {
	// npm install
  // npm run start

	const [ todoData, setTodoData ] = useState([]);
	const [ value, setValue ] = useState('');

  const btnStyle = {
    color: "#fff",
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
  }

  const getStyle = (completed) => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: completed ? 'line-through' : 'none'
    }
  }

  const handleClick = (id) => {
    let newTodoData = todoData.filter(data => data.id !== id);
		setTodoData(newTodoData);
  }

  const handleChange = (e) => {
		setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // form안에 input을 전송할때 페이지 리로드를 막아줌

    let newTodo = {
      id: Date.now(),
      title: value,
      conpleted: false
    };

		setTodoData(prev => [...prev, newTodo]);
		setValue('');
  }

	const handleCompleteChange = (id) => {
		let newTodoData = todoData.map(data => {
			if(data.id === id) {
				data.completed = !data.completed;
			}
			return data;
		})

		setTodoData(newTodoData);
	}

  return(
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        {todoData.map((data, index) => (
          <div style={getStyle(data.completed)} key={data.id}>
            <input type="checkbox" defaultChecked={false} onChange={() => handleCompleteChange(data.id)} />
            {data.title}
            <button style={btnStyle} onClick={() => handleClick(data.id)}>x</button>
          </div>
        ))}

        <form style={{display: 'flex'}} onSubmit={handleSubmit}>
          <input type="text" name="value" style={{flex:'10', padding: '5px'}}
            placeholder="해야 할 일을 입력하세요" value={value} onChange={handleChange}></input>
          <input type="submit" value="입력" className="btn" style={{flex: '1'}}></input>
        </form>
      </div>
    </div>
  )
}