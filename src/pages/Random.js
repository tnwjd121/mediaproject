import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../css/random.css'
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000"
const NUM_PROGRAMS = 8;

export default function Random() {
  const [randomPrograms, setRandomPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPrograms();
  }, []);

  // 새로고침을 누르면 계속 랜덤으로 변경되어야 해서 useEffect에 포함 X
  const fetchAllPrograms = async () => {
    try {
      const response = await axios.get(`${API_URL}/programs`);
      const allPrograms = response.data;
      const selectedPrograms = getRandomPrograms(allPrograms, NUM_PROGRAMS);
      setRandomPrograms(selectedPrograms);
    } catch (error) {
      console.error('랜덤 에러 발생:', error);
    }
  };

  const getRandomPrograms = (programs, num) => {
    // 랜덤으로 가져오기
    const random = programs.sort(() => Math.random() - 0.5)
    return random.slice(0, num)
  }

  // 목록 선택시 해당하는 상세페이지 이동
  const handleDetailClick = (id) => {
    navigate(`/Detail/${id}`)
  }

  return (
    <div id='body'>
      <div id='random-body'>
        <h1 id='random-title'>프로그램 랜덤 추천</h1>
        <button id='reset-button' onClick={fetchAllPrograms}>새로고침</button>
        <table id='random-table'>
          <thead>
            <tr>
              <th id='ranking-title-media'>제목</th>
              <th id='ranking-pd'>PD</th>
              <th id='ranking-content'>콘텐츠</th>
              <th id='ranking-genre'>장르</th>
              <th id='ranking-ratings'>시청률</th>
            </tr>
          </thead>
          <tbody>
            {randomPrograms.map((program, index) => (
              <tr key={program.id} onClick={() => handleDetailClick(program.id)}>
                <td id='list-title-media'>{program.title}</td>
                <td id='list-pd'>{program.pd}</td>
                <td id='list-content'>{program.content}</td>
                <td id='list-genre'>{program.genre}</td>
                <td id='list-rating'>{program.ratings}%</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  )
}
