import React, { useState } from 'react'
import '../css/todo.css'

export default function Todo() {

  const [todos, setTodos] =useState([]);
  const [inputValue,setInputValue] = useState('');
  const [checkedItems, setCheckedItems] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [modalInputValue, setModalInputValue] = useState('');

  // 추가버튼 클릭
  const handleAddClick = () => {
    // 내용 입력 없이 추가 버튼 클릭하면 alert창 표시
    if(inputValue.trim().length<=0){
      alert("오늘 할일을 입력해주십시오.")
    }else{
      // 내용 입력했을 경우 totos에 저장
      setTodos(prevTodos => [...prevTodos, inputValue])
      // 입력한 데이터 초기화
      setInputValue('')
    }
  }
  
  // 체크박스 체크 시 해당 목록이 체크되었는지 안되었는지 확인을 위해 생성
  const handleCheckboxChange = (index) => {
    setCheckedItems(prevCheckedItems => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index]
    }))
  }

  // 삭제 버튼 클릭 시 해당하는 목록 삭제
  const handleDeleteClick = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  // 수정 버튼 클릭시 해당하는 목록에 대한 모달 창 열어줌
  const handleEditClick = (index) => {
    // 해당하는 인덱스 번호
    setCurrentTodoIndex(index);
    // 해당하는 인덱스 번호의 입력 값
    setModalInputValue(todos[index]);
    // 모달창 열어줌
    setIsModalOpen(true);
  };

  // 모달 창에 입력한 값 저장
  const handleModalSave = () => {
    const newTodos = [...todos];
    newTodos[currentTodoIndex] = modalInputValue;
    setTodos(newTodos);
    setIsModalOpen(false);
  };

  // 모달 창 닫기
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
