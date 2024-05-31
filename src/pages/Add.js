import React, { useState } from 'react'
import '../css/add.css'
import axios from 'axios'

const API_URL = "http://localhost:5000"

export default function Add() {

  // 목서버에 전송할 데이터 폼 생성
  const[formData, setFormData] = useState({
    title:'',
    pd:'',
    content:'드라마',
    genre:'연애',
    ratings: '',
    summary : ''
  })

  // 입력된 데이터를 데이터 폼에 넣기
  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData({
      ...formData,
      [id]:value
    })
  }

  // 입력된 데이터 목서버로 전송
  const handleSubmit = async (e) => {
    const inputs = document.querySelectorAll("input")
    const textarea = document.querySelector("textarea")
    let isFormValue = true;
    // input에 빈값이 있는지 확인, 빈값이면 false 반환
    inputs.forEach(input => {
      if(input.value ===''){
        isFormValue = false;
      }
    })
    // textarea에 빈값이 있는지 확인, 빈값이면 false 반환
    if(textarea.value === ''){
      isFormValue = false
    }
    // 빈값일 경우 데이터 전송이 불가능하게 하고, alert창 표시
    if(!isFormValue){
      alert("모든 정보 작성 부탁드립니다.")
      return
    }
    try {
      // formData를 programs에 전송
      const response = await axios.post(`${API_URL}/programs`, formData);
      alert(`${response.data.title} 등록되었습니다.`)
      // 데이터 초기화
      setFormData({
        title:'',
        pd:'',
        content:'드라마',
        genre:'연애',
        ratings: '',
        summary : ''
      })
    } catch (error) {
      console.error('프로그램 등록 에러 발생:',error)
    }
  }

  return (
    <div id='add'>
      <h1 id='add-title'>프로그램 등록</h1>
      <label>
        <span>제목</span>
        <input id='title' type='text' value={formData.title} onChange={handleChange}/>
      </label>
      <label>
        <span>PD</span>
        <input id='pd' type='text' value={formData.pd} onChange={handleChange}/>
      </label>
      <label>
        <span>콘텐츠</span>
        <select id='content' onChange={handleChange} value={formData.content}>
          <option>드라마</option>
          <option>예능</option>
        </select>
      </label>
      <label>
        <span>장르</span>
        <select id='genre' onChange={handleChange} value={formData.genre}>
          <option>연애/로맨스</option>
          <option>판타지</option>
          <option>액션</option>
          <option>추리</option>
          <option>스릴러/공포</option>
          <option>코미디</option>
          <option>리얼리티</option>
        </select>
      </label>
      <label>
        <span>시청률</span>
        <input type='text' id='ratings' onChange={handleChange} value={formData.ratings}/>
      </label>
      <label>
        <span>줄거리</span>
        <textarea cols="60" rows="10" id='summary' onChange={handleChange} value={formData.summary}></textarea>
      </label>
      <button id='add-button' onClick={handleSubmit}>추가</button>
    </div>
  )
}
