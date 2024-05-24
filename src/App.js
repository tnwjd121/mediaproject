import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import Add from './pages/Add';
import List from './pages/List';
import Rainking from './pages/Ranking';
import Random from './pages/Random';
import Searchtitle from './pages/Searchtitle';
import Searchgenre from './pages/SearchGanre';
import Writer from './pages/Writer';
import Login from './pages/Login';
import Join from './pages/Join';


function App() {
  return (
    <Router>
      <>
      <Header/>
        <nav id='nav'>
          <ul id='nav-text'>
            <li><Link to='/Add'>프로그램 등록</Link></li>
            <li><Link to='/List'>프로그램 목록</Link></li>
            <li><Link to='/Rainking'>랭킹</Link></li>
            <li><Link to='/Random'>랜덤 추천</Link></li>
            <li><Link to='/Searchtitle'>제목 검색</Link></li>
            <li><Link to='/Searchgenre'>장르 검색</Link></li>
            <li><Link to='/Writer'>감독 정보</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Main />} /> 
          <Route path='/Add' element={<Add />} /> 
          <Route path='/List' element={<List />} /> 
          <Route path='/Rainking' element={<Rainking />} /> 
          <Route path='/Random' element={<Random />} /> 
          <Route path='/Searchtitle' element={<Searchtitle />} /> 
          <Route path='/Searchgenre' element={<Searchgenre />} /> 
          <Route path='/Writer' element={<Writer />} /> 
          <Route path='/Login' element={<Login />} /> 
          <Route path='/Join' element={<Join />} /> 
        </Routes>
        <Footer/>
      </>
    </Router>
  );
}

export default App;
