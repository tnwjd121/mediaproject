import React from 'react'
import '../css/header.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();


  return (
    <>
      <div className='header'>
        <div className='header-left'>
          <div className='logo' onClick={() => navigate('/')}>MEDIA</div>
        </div>
        <div className='header-right'>
          <div onClick={() => navigate('/Login')}>로그인</div>
          <div onClick={() => navigate('/Join')}>회원가입</div>
        </div>
      </div>
    </>
  )
}
