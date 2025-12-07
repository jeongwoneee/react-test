// src/components/ProgressBar.jsx
import React from 'react';
import './ProgressBar.css'; // 👈 CSS 파일 불러오기!

const ProgressBar = ({ current, total, label }) => {
  const widthPercentage = (current / total) * 100;

  return (
    <div className="progress-container">
      {/* 텍스트 정보 영역 */}
      <div className="progress-info">
        {label && <span className="progress-label">{label}</span>}
        <span>{current} / {total}</span>
      </div>
      
      {/* 막대 그래프 영역 */}
      <div className="progress-track">
        <div 
          className="progress-fill"
          // 👇 [중요] 변하는 값(width)은 CSS 파일에 못 넣으므로 여기 남겨둠!
          style={{ width: `${widthPercentage}%` }} 
        />
      </div>
    </div>
  );
};

export default ProgressBar;