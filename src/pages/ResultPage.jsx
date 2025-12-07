// src/pages/ResultPage.jsx
import React from 'react';
import './ResultPage.css';
import ProgressBar from '../components/ProgressBar'; // 👈 재사용을 위해 불러옴!
import { typeParams } from '../data/questionData';

const ResultPage = ({ result, scores, onReset, type }) => {
  if (!result) return <div>결과를 분석 중입니다...</div>;

  // 👇 [추가] 점수가 전부 0점인지 확인 (공유받은 상태인지 체크)
  const isSharedResult = Object.values(scores).reduce((a, b) => a + b, 0) === 0;
  // 점수를 배열로 변환해서 반복문 돌리기 편하게 만듦
// (typeParams 배열을 돌면서 -> 현재 점수(scores)와 합체)
  const scoreItems = typeParams.map(info => ({
    label: info.label,        // 데이터 파일에서 가져온 이름 ("🎨 프론트엔드")
    score: scores[info.type]  // 점수판에서 해당 타입의 점수 꺼내오기 (예: scores['F'])
  }));

  // [유지보수 포인트] 현재 도메인을 자동으로 감지하여 링크 생성
  const handleShare = () => {
    // window.location.origin은 'http://localhost:5173' 같은 도메인을 자동으로 가져옴
    const shareUrl = `${window.location.origin}/?mbti=${type}`;
    
    // 최신 브라우저 API 사용 (비동기 처리)
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('결과 링크가 복사되었습니다! 친구에게 공유해보세요.'))
      .catch(() => alert('링크 복사에 실패했습니다.'));
  };

  return (
    <div className="page-container">
      <h1>당신의 유형은?</h1>
      <h2 className="result-title">{result.title}</h2>
      <p className="result-desc">{result.desc}</p>

     {/* 👇 [수정] 공유받은 결과가 아닐 때(!isSharedResult)만 상세 분석표를 보여줌 */}
      {!isSharedResult && (
        <div className="analysis-box">
          <h3 className="analysis-title">📊 상세 분석표</h3>
          {scoreItems.map((item, idx) => (
            <ProgressBar 
              key={idx} 
              label={item.label} 
              current={item.score} 
              total={7} 
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
      {/* 👆 여기까지 */}

      <button className="btn-primary btn-reset" onClick={onReset}>
        다시 테스트하기
      </button>
    </div>
  );
};

export default ResultPage;