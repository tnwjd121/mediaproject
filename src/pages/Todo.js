import React, { useState } from 'react'
import '../css/todo.css'

export default function Todo() {

  const [todos, setTodos] =useState([]);
  const [inputValue,setInputValue] = useState('');
  const [checked, setChecked] = useState([])

  const handleAddClick = () => {
    if(inputValue.trim().length<=0){
      alert("오늘 할일을 입력해주십시오.")
    }else{
      setTodos(prevTodos => [...prevTodos, inputValue])
      setInputValue('')
    }
  }

  const handleDeleteClick = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }
  /* 
  1. 수정시 modal
  2. checkbox 클릭시 밀줄 그어주기
  */

  return (
    <div id='body'>
      <div id='todo-body'>
        <h1>오늘 할일</h1>
        <input id='add-todo' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button id='add-todo-button' onClick={handleAddClick}>Add</button>
        <div id='todo-list'>
          {todos.map((todo, index) => (
            <div key={index}>
              <input type='checkbox' className='checkbox' />
              <span>{todo}</span>
              <button id='edit-button' >수정</button>
              <button id='delete-button' onClick={handleDeleteClick}>삭제</button>
            </div>
          ))}
        </div>
        <div id='modal'>
          <h3>텍스트 수정</h3>
          <input type='text'/>
          <button>수정완료</button>
        </div>
      </div>
    </div>
  )
}
