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
        console.log('시청률 에러 발생:', error)
      }
    }
    fetchAllPrograms();
  }, [])

  // 콘텐츠 평균 시청률
  const contentAverageRating = (content) => {
    // 프로그램에서 해당하는 콘텐츠만 가져오기
    const contentPrograms = programs.filter(program => program.content === content);
    // totalRating에 해당하는 콘텐츠 시청률 전체 더해주기
    const totalRating = contentPrograms.reduce((total, program) => total + parseFloat(program.ratings), 0);
    // 평균 시청률 구하기
    const averageRating = contentPrograms.length > 0 ? totalRating / contentPrograms.length : 0;
    // 소수점 한자리까지만 반환
    return Math.round(averageRating * 10) / 10;
  };

  // 장르 평균 시청률
  const genreAverageRating = (genre) => {
    // 프로그램에서 해당하는 장르만 가져오기
    const genrePrograms = programs.filter(program => program.genre === genre);
    // totalRating에 해당하는 콘텐츠 시청률 전체 더해주기
    const totalRating = genrePrograms.reduce((total, program) => total + parseFloat(program.ratings), 0)
    // 평균 시청률 구하기
    const averageRating = genrePrograms.length > 0 ? totalRating / genrePrograms.length : 0;
    // 소수점 한자리까지만 반환
    return Math.round(averageRating * 10) / 10
  }

  // contentAverageRatings에 콘텐츠와 평균 시청률 값 넣기
  const contentTypes = [...new Set(programs.map(program => program.content))];
  const contentAverageRatings = contentTypes.map(content => ({
    content,
    averageRating: contentAverageRating(content)
  }));

  // genreAverageRatings에 장르와 평균 시청률 값 넣기
  const genreTypes = [...new Set(programs.map(program=> program.genre))];
  const genreAverageRatings = genreTypes.map(genre => ({
    genre,
    averageRating: genreAverageRating(genre)
  }))

  // 평균 시청률이 높은 순으로 정렬
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
