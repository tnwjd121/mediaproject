import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <>
      <Header/>
        <nav className='nav'>
          {/* <ul>
            <li className='border-separator'><Link to='/AddGame' className='li-css'>게임등록</Link></li>
          </ul> */}
        </nav> 
        <Routes>
          <Route path='/' element={<Main />} /> 
        </Routes>
        {/* <Footer/> */}
      </>
    </Router>
  );
}

export default App;
