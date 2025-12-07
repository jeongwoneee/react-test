// src/pages/StartPage.jsx
import React from 'react';
import './StartPage.css';

const StartPage = ({ onStart }) => {
  return (
    <div className="page-container">
      <h1>💻 개발자 MBTI 테스트</h1>
      <p>나에게 딱 맞는 개발 직군은 무엇일까요?</p>
      <button className="btn-primary" onClick={onStart}>
        테스트 시작하기
      </button>
    </div>
  );
};

export default StartPage;