import React, { useState } from 'react'
import '../css/login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000"

export default function Login() {

  const navigate = useNavigate();

  // 데이터 폼 생성
  const[formData, setFormData] = useState({
    userid:'',
    password:''
  });
  
  //입력된 데이터 데이터 폼에 넣기
  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData({
      ...formData,
      [id]:value
    });
  }

  // 목서버 users의 정보와 입력한 데이터가 일치하면 로그인 성공
  const handleSubmit = async (e) =>{
    try {
      const response = await axios.get(`${API_URL}/users`)
      const users = response.data;
      // 입력한 데이터와 users가 일치하는지 확인
      const user = users.find(user => user.userid === formData.userid && user.password === formData.password);
      if (user) {
        alert(`${user.name}님 로그인 성공하였습니다.`);
        navigate('/')
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  }

  return (
    <div id='login'>
      <h1 id='login-title'>Login</h1>
      <label >
        <span className='input-span'>아이디</span>
        <input type='text' id='userid'  onChange={handleChange} value={formData.userid}/>
      </label>
      <label>
        <span className='input-span'>비밀번호</span>
        <input type='password' id='password'  onChange={handleChange} value={formData.password}/>
      </label>
      <button id='login-button' onClick={handleSubmit}>로그인</button>
    </div>
  )
}
