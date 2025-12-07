// src/pages/QuestionPage.jsx
import React from 'react';
import './QuestionPage.css';
import ProgressBar from '../components/ProgressBar'; // 👈 우리가 만든 부품 가져오기

const QuestionPage = ({ question, currentStep, totalStep, onAnswer }) => {
  return (
    <div className="page-container">
      {/* 👇 길었던 코드가 딱 한 줄로 줄어듦! (가독성 UP) */}
      <ProgressBar current={currentStep} total={totalStep} />

      <h2 className="question-text">{question.q}</h2>

      <div className="answer-box">
        {question.answers.map((ans, idx) => (
          <button 
            key={idx} 
            className="btn-answer" 
            onClick={() => onAnswer(ans.type)}
          >
            {ans.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;