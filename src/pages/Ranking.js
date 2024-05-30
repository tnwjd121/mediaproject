import React, { useEffect, useState } from 'react';
import '../css/ranking.css';
import axios from 'axios';
import { GrCaretPrevious,GrCaretNext } from "react-icons/gr";

const API_URL = "http://localhost:5000";
const PAGE_SIZE = 10;

export default function Ranking() {
  const [allPrograms, setAllPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchAllPrograms() {
      try {
        const response = await axios.get(`${API_URL}/programs`);
        setAllPrograms(response.data);
      } catch (error) {
        console.error('랭킹 에러 발생:', error);
      }
    }
    fetchAllPrograms();
  }, []);

  // 프로그램을 시청률 기준으로 내림차순 정렬
  const sortedPrograms = allPrograms.sort((a,b) => b.ratings - a.ratings);
  
  const totalPages = Math.ceil(sortedPrograms.length / PAGE_SIZE);
  const currentPrograms = sortedPrograms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleNextPage = () => {
    setCurrentPage(nextPage => Math.min(nextPage + 1, totalPages));
  }

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }

  return (
    <div id='body'>
      <div id='ranking-body'>
        <h1 id='ranking-title'>프로그램 랭킹</h1>
        <table id='ranking-table'>
          <thead>
            <tr>
              <th id='ranking-num'>순위</th>
              <th id='ranking-title-media'>제목</th>
              <th id='ranking-pd'>PD</th>
              <th id='ranking-content'>콘텐츠</th>
              <th id='ranking-genre'>장르</th>
              <th id='ranking-ratings'>시청률</th>
            </tr>
          </thead>
          <tbody>
            {currentPrograms.map((program, index) => (
              <tr key={program.id}>
                <td>{(currentPage - 1) * PAGE_SIZE + index + 1}위</td>
                <td id='ranking-title-media'>{program.title}</td>
                <td id='ranking-pd'>{program.pd}</td>
                <td id='ranking-content'>{program.content}</td>
                <td id='ranking-genre'>{program.genre}</td>
                <td id='ranking-rating'>{program.ratings}%</td>
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
