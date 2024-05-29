import React, { useState } from 'react'
import '../css/join.css'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000"

export default function Join() {
  const navigate = useNavigate()

  const[formData, setFormData] = useState({
    userid: '',
    password: '',
    email:'',
    name: '',
    gender: '남성',
    birth:''
  });

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData({
      ...formData,
      [id]:value
    });
  };

  const handleSubmit = async (e) => {
    const inputs = document.querySelectorAll("input")
    e.preventDefault();
    let isFormValid = true;
    inputs.forEach(input => {
        if(input.value ===''){
          isFormValid = false;
        }
    });

    if(!isFormValid){
      alert("모든 정보 작성 부탁드립니다.")
      return
    }
    const useridCheck = await axios.get(`${API_URL}/users?userid=${formData.userid}`)
    if(useridCheck.data.length> 0){
      alert("중복된 아이디이므로 다른 아이디를 입력 부탁드립니다.")
      return
    }

    try {
      // 폼 데이터 전송
      const response = await axios.post(`${API_URL}/users`, formData);
      console.log(response.data);
      alert(`${response.data.name}님 회원가입 되었습니다.`)
      navigate('/Login')
    } catch (error) {
      console.error('에러 발생:',error);
    }
  }

  return (
    <div id='join'>
      <h1 id='join-title'>Join</h1>
      <label >
        <span className='input-span'>아이디</span>
        <input type='text' id='userid' value={formData.userid} onChange={handleChange}/>
      </label>
      <label>
        <span className='input-span'>비밀번호</span>
        <input type='password' id='password' value={formData.password} onChange={handleChange}/>
      </label>
      <label>
        <span className='input-span'>이메일</span>
        <input type='email' id='email' value={formData.email} onChange={handleChange}/>
      </label>
      <label>
        <span className='input-span'>이름</span>
        <input type='text' id='name' value={formData.name} onChange={handleChange}/>
      </label>
      <label>
        <span className='input-span'>성별</span>
        <select id='gender' value={formData.gender} onChange={handleChange}>
          <option>남성</option>
          <option>여성</option>
        </select>
      </label>
      <label>
        <span className='input-span'>생년월일</span>
        <input type="date" id='birth' value={formData.birth} onChange={handleChange}/>
      </label>
      <button id='join-button' onClick={handleSubmit}>회원가입</button>
    </div>
  )
}
