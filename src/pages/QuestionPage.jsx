// src/pages/QuestionPage.jsx
import React from 'react';
import './QuestionPage.css';
import ProgressBar from '../components/ProgressBar'; // 

const QuestionPage = ({ question, currentStep, totalStep, onAnswer }) => {
  return (
    <div className="page-container">
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