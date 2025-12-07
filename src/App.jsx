// src/App.jsx
import React, { useState, useMemo, useCallback } from 'react'; // useEffect 제거!
import './App.css';
import { questions, results } from './data/questionData';
import StartPage from './pages/StartPage';
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';

function App() {
  // 👇 [수정 1] URL에 공유된 결과가 있는지 확인하는 함수 (지연 초기화)
  // 이 함수는 앱이 켜질 때 딱 한 번만 실행됩니다.
  const getInitialType = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('mbti'); // 예: 'F' 또는 null
  };

  // 👇 [수정 2] step 초기값 설정 (공유받았으면 바로 결과페이지로!)
  const [step, setStep] = useState(() => {
    // 공유된 MBTI 값이 있으면? -> 바로 결과 페이지(questions.length + 1)로 시작
    // 없으면? -> 0 (시작 페이지)으로 시작
    return getInitialType() ? questions.length + 1 : 0;
  });

  const [scores, setScores] = useState({ F: 0, B: 0, A: 0, P: 0 });
  
  // 👇 [수정 3] sharedType 초기값도 URL 보고 결정
  const [sharedType, setSharedType] = useState(() => getInitialType());

  // (useEffect 부분은 아예 삭제했습니다!)

  const handleAnswer = useCallback((type) => {
    setScores((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setStep((prev) => prev + 1);
  }, []);

  const resultType = useMemo(() => {
    // 공유받은 타입이 있으면 그걸 무조건 반환
    if (sharedType) return sharedType;

    if (step <= questions.length) return null;
    
    const maxScore = Math.max(...Object.values(scores));
    const highestTypes = Object.keys(scores).filter(type => scores[type] === maxScore);
    
    if (highestTypes.length > 1) return 'Unicorn';
    return highestTypes[0];
  }, [step, scores, sharedType]);

  const handleReset = () => {
    setStep(0);
    setScores({ F: 0, B: 0, A: 0, P: 0 });
    setSharedType(null);
    window.history.pushState({}, null, '/'); // URL 초기화
  };

  return (
    <div className="App">
      {step === 0 && <StartPage onStart={() => setStep(1)} />}
      
      {step > 0 && step <= questions.length && (
        <QuestionPage 
          question={questions[step - 1]}
          currentStep={step}
          totalStep={questions.length}
          onAnswer={handleAnswer}
        />
      )}

      {step > questions.length && (
        <ResultPage 
          result={results[resultType]} 
          scores={scores} 
          onReset={handleReset}
          type={resultType}
        />
      )}
    </div>
  );
}

export default App;