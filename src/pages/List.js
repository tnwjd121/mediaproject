import React, { useEffect, useState } from 'react';
import '../css/list.css';
import axios from 'axios';
import { GrCaretPrevious,GrCaretNext } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000";
const PAGE_SIZE = 10;

export default function List() {
  const [allPrograms, setAllPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // 목서버 programs를 동기화
  useEffect(() => {
    async function fetchAllPrograms() {
      try {
        const response = await axios.get(`${API_URL}/programs`);
        setAllPrograms(response.data);
      } catch (error) {
        console.error('프로그램 목록 에러 발생:', error);
      }
    }
    fetchAllPrograms();
  }, []);

  //Math.ceil을 소수값이 있을때 값을 올려서 값이 소수점일때 페이지를 정수로 받을 수 있음
  const totalPages = Math.ceil(allPrograms.length / PAGE_SIZE);
  // 현재 페이지일때 가져올 programs데이터 
  const currentPrograms = allPrograms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  //다음 버튼을 클릭했을때 최소 마지막 페이지까지만 이동되도록
  const handleNextPage = () => {
    setCurrentPage(nextPage => Math.min(nextPage + 1, totalPages));
  }

  // 이전 버튼을 클릭했을때 최대 1페이지까지만 이동되도록
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }

  // 목록 클릭시 해당하는 프로그램에 상세페이지로 이동
  const handleDetailClick = (id) => {
    navigate(`/Detail/${id}`);
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
            {currentPrograms.map(program => (
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
        <div className='page-button'>
          <button id='left-button' onClick={handlePrevPage} disabled={currentPage === 1}><GrCaretPrevious /></button>
          <button id='right-button' onClick={handleNextPage} disabled={currentPage === totalPages}><GrCaretNext /></button>
        </div>
      </div>
    </div>
  );
}
