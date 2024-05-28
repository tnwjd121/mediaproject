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
import Search from './pages/Search';
import Login from './pages/Login';
import Join from './pages/Join';
import Detail from './pages/Detail';
import Rating from './pages/Rating'
import Addiction from './pages/Addiction';
import Todo from './pages/Todo';


function App() {
  return (
    <Router>
      <>
      <Header/>
        <div id='nav-background'>
          <nav id='nav'>
            <ul id='nav-text'>
              <li><Link to='/Add'>프로그램 등록</Link></li>
              <li><Link to='/List'>프로그램 목록</Link></li>
              <li><Link to='/Search'>검색</Link></li>
              <li><Link to='/Rainking'>랭킹</Link></li>
              <li><Link to='/Rating'>시청률 정보</Link></li>
              <li><Link to='/Random'>랜덤 추천</Link></li>
              <li><Link to='/Addiction'>중독 테스트</Link></li>
              <li><Link to='/Todo'>오늘 할일</Link></li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path='/' element={<Main />} /> 
          <Route path='/Add' element={<Add />} /> 
          <Route path='/List' element={<List />} /> 
          <Route path='/Rainking' element={<Rainking />} /> 
          <Route path='/Random' element={<Random />} /> 
          <Route path='/Search' element={<Search />} /> 
          <Route path='/Rating' element={<Rating />} /> 
          <Route path='/Login' element={<Login />} /> 
          <Route path='/Join' element={<Join />} /> 
          <Route path='/Addiction' element={<Addiction />} /> 
          <Route path='/Detail/:id' element={<Detail />} /> 
          <Route path='/Todo' element={<Todo/>} /> 
        </Routes>
        <Footer/>
      </>
    </Router>
  );
}

export default App;
