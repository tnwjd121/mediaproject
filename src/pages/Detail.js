import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../css/detail.css'

const API_URL = "http://localhost:5000";

export default function Detail() {

  const { id } = useParams();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    async function fetchProgram() {
      try {
        const response = await axios.get(`${API_URL}/programs/${id}`);
        setProgram(response.data);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    }
    fetchProgram();
  }, [id]);

  if (!program) {
    return <div>Loading...</div>;
  }
  return (
    <div id='body'>
      <div id='detail-body'>
        <h1 id='detail-title'>{program.title}</h1>
        <p><strong>PD:</strong> {program.pd}</p>
        <p><strong>콘텐츠:</strong> {program.content}</p>
        <p><strong>장르:</strong> {program.genre}</p>
        <p><strong>시청률:</strong> {program.ratings}%</p>
        <p><strong>줄거리:</strong> {program.summary}</p>
      </div>
    </div>
  )
}
