import React, { useEffect, useState } from 'react'
import '../css/list.css'
import axios from 'axios';

const API_URL = "http://localhost:5000";
const PAGE_SIZE = 10;

//페이지 안 맞음 확인 필요함
export default function List() {

  const [programs, setPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(()=>{
    async function fetchPrograms() {
      try {
        const response = await axios.get(`${API_URL}/programs?page=${currentPage}&limit=${PAGE_SIZE}`)
        setPrograms(response.data)
        setTotalPages(Math.ceil(response.data.totalCount / PAGE_SIZE))
        console.log(response.data)
      } catch (error) {
        console.error('에러 발생:', error)
      }
    }
    fetchPrograms();
  }, [currentPage]);

  const handleNextPage = () =>{
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  }
  const handlePrevPage = () =>{
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }

  return (
    <div id='body'>
      <div id='list-body'>
        <h1 id='list-title'>프로그램 목록</h1>
        <table id='list-table'>
          <thead>
            <tr>
              <th id='list-title-media'>제목</th>
              <th id='list-pd'>PD</th>
              <th id='list-content'>콘텐츠</th>
              <th id='list-genre'>장르</th>
              <th id='list-ratings'>시청률</th>
            </tr>
          </thead>
          <tbody>
          {programs.map(program => (
            <tr key={program.id}>
              <td id='list-title-media'>{program.title}</td>
              <td id='list-pd'>{program.pd}</td>
              <td id='list-content'>{program.content}</td>
              <td id='list-genre'>{program.genre}</td>
              <td id='list-rating'>{program.ratings}%</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div>
          <button id='left-button' onClick={handlePrevPage} disabled={currentPage === 1}>🎈</button>
          <button id='right-button' onClick={handleNextPage} disabled = {currentPage === totalPages}>🎈</button>
        </div>
      </div>
    </div>
  )
}
