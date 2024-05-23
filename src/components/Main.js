import React from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import '../css/main.css';
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";

export default function Main() {
  

  const renderListItems = () => {
    const rankings = [
      { id: 1, image: '이미지', gameName: '게임명', stars: '별점', recommendations: '추천수' },
      { id: 2, image: '이미지', gameName: '게임명', stars: '별점', recommendations: '추천수' },
      { id: 3, image: '이미지', gameName: '게임명', stars: '별점', recommendations: '추천수' },
      { id: 4, image: '이미지', gameName: '게임명', stars: '별점', recommendations: '추천수' },
      { id: 5, image: '이미지', gameName: '게임명', stars: '별점', recommendations: '추천수' },
    ];

    return rankings.map((item) => (
      <li key={item.id}>
        <div className='list-item'>
          <div className='list-left'>
            <div>{item.id}</div>
            <div>{item.image}</div>
            <div>{item.gameName}</div>
          </div>
          <div className='list-right'>
            <div>{item.stars}</div>
            <div>{item.recommendations}</div>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <>
      <div className='main-container'>
        <div className="ranking-title">
          <div>
            <h2>랭킹</h2>
          </div>
          <div className='filter'>
            <div><TiArrowSortedDown />PS4</div>
            <div><TiArrowSortedDown />추천순</div>
          </div>
        </div>
        <div className='main-list'>
          <ul>{renderListItems()}</ul>
        </div>
        <div className='button'>
          <button><VscTriangleLeft /></button>
          <button><VscTriangleRight /></button>
        </div>
      </div>
      <div className='main-container'>
        <div className="main-title">
          <div>
            <h2>신규 게임</h2>
          </div>
          <div className='filter'>
            <div><TiArrowSortedDown />PS4</div>
            <div><TiArrowSortedDown />추천순</div>
          </div>
        </div>
        <div className='main-list'>
          <ul>{renderListItems()}</ul>
        </div>
        <div className='button'>
          <button><VscTriangleLeft /></button>
          <button><VscTriangleRight /></button>
        </div>
      </div>
    </>
  );
}
