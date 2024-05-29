import React, { useState } from 'react'
import '../css/todo.css'

export default function Todo() {

  const [todos, setTodos] =useState([]);
  const [inputValue,setInputValue] = useState('');
  const [checkedItems, setCheckedItems] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [modalInputValue, setModalInputValue] = useState('');

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

  const handleCheckboxChange = (index) => {
    setCheckedItems(prevCheckedItems => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index]
    }))
  }
  const handleEditClick = (index) => {
    setCurrentTodoIndex(index);
    setModalInputValue(todos[index]);
    setIsModalOpen(true);
  };

  const handleModalSave = () => {
    const newTodos = [...todos];
    newTodos[currentTodoIndex] = modalInputValue;
    setTodos(newTodos);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div id='body'>
      <div id='todo-body'>
        <h1 id='todo-title'>오늘 할일</h1>
        <input id='add-todo' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button id='add-todo-button' onClick={handleAddClick}>추가</button>
        <div id='todo-list'>
          {todos.map((todo, index) => (
            <div key={index} style={{ textDecoration: checkedItems[index] ? 'line-through' : 'none' }} id='todo-div'>
              <div>
                <input
                  type='checkbox'
                  id='checkbox-input'
                  className='checkbox'
                  checked={checkedItems[index] || false}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span id='checkbox-span'>{todo}</span>
              </div>
              <div>
                <button id='edit-button' onClick={() => handleEditClick(index)}>수정</button>
                <button id='delete-button' onClick={() => handleDeleteClick(index)}>삭제</button>
              </div>
            </div>
          ))}
        </div>
        <div
          id="modal"
          style={{ display: isModalOpen ? 'block' : 'none' }}
        >
          <h3 id='modal-text'>텍스트 수정</h3>
          <input
            type="text"
            value={modalInputValue}
            onChange={e => setModalInputValue(e.target.value)}
            id='modal-input'
          />
          <button onClick={handleModalSave} id='edit-complete-button'>수정완료</button>
          <button onClick={handleModalClose} id='cloese-button'>닫기</button>
        </div>
      </div>
    </div>
  )
}
