// src/App.jsx
import React, { useState, useMemo, useCallback } from 'react';
import './App.css';
import { questions, results } from './data/questionData';
import StartPage from './pages/StartPage';
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';

function App() {
  const getInitialType = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('mbti');
  };

  const [step, setStep] = useState(() => {
    return getInitialType() ? questions.length + 1 : 0;
  });

  const [scores, setScores] = useState({ F: 0, B: 0, A: 0, P: 0 });
  
  const [sharedType, setSharedType] = useState(() => getInitialType());

  const handleAnswer = useCallback((type) => {
    setScores((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setStep((prev) => prev + 1);
  }, []);

  const resultType = useMemo(() => {
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
    window.history.pushState({}, null, '/');
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