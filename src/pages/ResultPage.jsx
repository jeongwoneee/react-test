// src/pages/ResultPage.jsx
import React from 'react';
import './ResultPage.css';
import ProgressBar from '../components/ProgressBar';
import { typeParams, questions } from '../data/questionData';

const ResultPage = ({ result, scores, onReset, type }) => {
  const isSharedResult = Object.values(scores).reduce((a, b) => a + b, 0) === 0;
  const scoreItems = typeParams.map(info => ({
    label: info.label,      
    score: scores[info.type] 
  }));

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/?mbti=${type}`;
    
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('결과 링크가 복사되었습니다! 친구에게 공유해보세요.'))
      .catch(() => alert('링크 복사에 실패했습니다.'));
  };

  return (
    <div className="page-container">
      <h1>당신의 유형은?</h1>
      <h2 className="result-title">{result.title}</h2>
      <p className="result-desc">{result.desc}</p>

      {!isSharedResult && (
        <div className="analysis-box">
          <h3 className="analysis-title">📊 상세 분석표</h3>
          {scoreItems.map((item, idx) => (
            <ProgressBar 
              key={idx} 
              label={item.label} 
              current={item.score} 
              total={questions.length}
            />
          ))}
        </div>
      )}
      <button 
             className="btn-primary btn-share" 
             onClick={handleShare}
           >
             🔗 결과 공유하기
      </button>

      <button className="btn-primary btn-reset" onClick={onReset}>
        다시 테스트하기
      </button>
    </div>
  );
};

export default ResultPage;