import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import '../css/search.css'
import axios from 'axios';

const API_URL = "http://localhost:5000"

export default function Search() {
  const [searchOption, setSearchOption] = useState('title');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/programs`);
      const allPrograms = response.data;
      const filteredPrograms = allPrograms.filter(program =>
        program[searchOption].toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(filteredPrograms);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <div id='body'>
      <div id='search-body'>
        <select id='search' value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
          <option value='title'>제목</option>
          <option value='genre'>장르</option>
          <option value='pd'>PD</option>
        </select>
        <input 
        type='text' 
        id='search-input' 
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)}/>
        <button id='search-button' onClick={handleSearch}><FaSearch /></button>
      </div>
      <p id='genre-text'>장르 : 연애/로맨스, 판타지, 액션, 추리, 스릴러/공포, 코미디, 리얼리티</p>
      {searchResults.length > 0 && (
      <div>
        <table id='search-table'>
          <thead>
            <tr>
            <th id='search-title-media'>제목</th>
              <th id='search-pd'>PD</th>
              <th id='search-content'>콘텐츠</th>
              <th id='search-genre'>장르</th>
              <th id='search-ratings'>시청률</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(program => (
              <tr key={program.id}>
                <td id='search-title-media'>{program.title}</td>
                <td id='search-pd'>{program.pd}</td>
                <td id='search-content'>{program.content}</td>
                <td id='search-genre'>{program.genre}</td>
                <td id='search-rating'>{program.ratings}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  )
}
