import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../css/rating.css'

const API_URL = "http://localhost:5000"

export default function Writer() {
  const [programs, setProgrmas] =useState([]);

  useEffect(()=>{
    async function fetchAllPrograms() {
      try {
        const response = await axios.get(`${API_URL}/programs`);
        setProgrmas(response.data)
      } catch (error) {
        console.log('에러 발생:', error)
      }
    }
    fetchAllPrograms();
  }, [])


  const contentAverageRating = (content) => {
    const contentPrograms = programs.filter(program => program.content === content);
    const totalRating = contentPrograms.reduce((total, program) => total + parseFloat(program.ratings), 0);
    const averageRating = contentPrograms.length > 0 ? totalRating / contentPrograms.length : 0;
    // 첫째 자리에서 반올림하여 숫자로 변환
    return Math.round(averageRating * 10) / 10;
  };

  const genreAverageRating = (genre) => {
    const genrePrograms = programs.filter(program => program.genre === genre);
    const totalRating = genrePrograms.reduce((total, program) => total + parseFloat(program.ratings), 0)
    const averageRating = genrePrograms.length > 0 ? totalRating / genrePrograms.length : 0;
    return Math.round(averageRating * 10) / 10
  }

  // 프로그램 데이터에 있는 모든 콘텐츠/장르를 가져와서 각 콘텐츠/장르의 평균 시청률을 계산합니다.
  const contentTypes = [...new Set(programs.map(program => program.content))];
  const contentAverageRatings = contentTypes.map(content => ({
    content,
    averageRating: contentAverageRating(content)
  }));

  const genreTypes = [...new Set(programs.map(program=> program.genre))];
  const genreAverageRatings = genreTypes.map(genre => ({
    genre,
    averageRating: genreAverageRating(genre)
  }))

  // 평균 시청률이 높은 순으로 정렬합니다.
  const sortedContentRatings = contentAverageRatings.sort((a, b) => b.averageRating - a.averageRating);
  const sortedGenreRatings = genreAverageRatings.sort((a,b)=> b.averageRating - a.averageRating)


  return (
    <div id='body'>
      <div id='rating-body'>
        <h1 className='rating-title'>콘텐츠 시청률</h1>
        <table className='rating-table'>
          <thead>
            <tr>
              <th>순위</th>
              <th>콘텐츠</th>
              <th>시청률</th>
            </tr>
          </thead>
          <tbody>
          {sortedContentRatings.map(({ content, averageRating }, index) => (
              <tr key={index}>
                <td>{index + 1}위</td>
                <td>{content}</td>
                <td>{averageRating}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1 className='rating-title'>장르 시청률</h1>
        <table className='rating-table'>
          <thead>
            <tr>
              <th>순위</th>
              <th>장르</th>
              <th>시청률</th>
            </tr>
          </thead>
          <tbody>
          {sortedGenreRatings.map(({ genre, averageRating }, index) => (
              <tr key={index}>
                <td>{index + 1}위</td>
                <td>{genre}</td>
                <td>{averageRating}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
