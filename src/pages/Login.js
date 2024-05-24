import React, { useState } from 'react'
import '../css/login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000"

export default function Login() {

  const navigate = useNavigate();


  const[formData, setFormData] = useState({
    userid:'',
    password:''
  });

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData({
      ...formData,
      [id]:value
    });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/users`)
      const users = response.data;
      const user = users.find(user => user.userid === formData.userid && user.password === formData.password);
      if (user) {
        console.log(user.name)
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
