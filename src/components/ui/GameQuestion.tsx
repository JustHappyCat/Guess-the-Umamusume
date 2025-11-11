"use client";

import { useGame, GameQuestion as GameQuestionType } from "@/contexts/GameContext";
import { useState, useEffect } from "react";

interface GameQuestionProps {
  question: GameQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  showFeedback?: boolean;
}

export default function GameQuestion({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  showFeedback = true 
}: GameQuestionProps) {
  const { currentSession, answerQuestion, getProgress, getTimeElapsed } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(question.isAnswered || false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation?: string } | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Update time elapsed
  useEffect(() => {
    if (!isAnswered) {
      const timer = setInterval(() => {
        setTimeElapsed(getTimeElapsed());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAnswered, getTimeElapsed]);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    const result = answerQuestion(answer);
    setFeedback(result);
    setShowResult(true);
    setIsAnswered(true);

    // Trigger callback after a delay to show feedback
    setTimeout(() => {
      onAnswer(answer);
    }, 2000);
  };

  useEffect(() => {
    setSelectedAnswer("");
    setShowResult(false);
    setIsAnswered(question.isAnswered || false);
    setFeedback(null);
  }, [question.id, question.isAnswered]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return "hover:bg-[var(--card-hover)] border-[var(--card-border)]";
    }
    
    if (option === question.correctAnswer) {
      return "bg-[var(--success)] border-[var(--success)] text-white animate-bounce";
    }
    
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return "bg-[var(--error)] border-[var(--error)] text-white";
    }
    
    return "bg-[var(--card)] border-[var(--card-border)] opacity-60";
  };

  const progress = getProgress();

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center py-8 px-4">
      <div className="container max-w-4xl">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-[var(--foreground-secondary)]">
              Question {questionNumber} of {totalQuestions}
            </div>
            <div className="flex-1 max-w-xs">
              <div className="w-full bg-[var(--card-border)] rounded-full h-2">
                <div 
                  className="bg-[var(--accent-gold)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[var(--foreground-secondary)]">{formatTime(timeElapsed)}</span>
            </div>
            
            {currentSession && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="text-[var(--foreground-secondary)]">{currentSession.score}</span>
              </div>
            )}
            
            {currentSession && currentSession.streak > 0 && (
              <div className="flex items-center gap-1 bg-[var(--accent-gold)] text-[var(--primary-dark)] px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                {currentSession.streak}
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Question Card */}
        <div className="card max-w-4xl mx-auto animate-scale-in">
          <div className="text-center mb-8">
            {/* Question Type Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--card-hover)] rounded-full text-xs font-medium text-[var(--foreground-secondary)] mb-4">
              {question.type === "image" && (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Image Question
                </>
              )}
              {question.type === "bio" && (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Character Bio
                </>
              )}
              <span className="ml-1 capitalize">{question.difficulty}</span>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8 leading-relaxed">
              {question.question}
            </h2>

            {/* Image Display (for image questions) */}
            {question.type === "image" && (
              <div className="mb-8">
                <div className="max-w-md mx-auto">
                  <div className="aspect-square bg-[var(--background-tertiary)] rounded-xl overflow-hidden shadow-lg">
                    {/* Placeholder for actual Umamusume image */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)]">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🏇‍♀️</div>
                        <p className="text-[var(--foreground-secondary)]">Umamusume Character Image</p>
                        <p className="text-xs text-[var(--foreground-tertiary)] mt-2">Image would load here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
                className={`p-4 border-2 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] ${getOptionStyle(option)}`}
                aria-label={`Answer option ${index + 1}: ${option}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    showResult 
                      ? (option === question.correctAnswer 
                          ? "bg-white text-[var(--success)]" 
                          : option === selectedAnswer && option !== question.correctAnswer
                            ? "bg-white text-[var(--error)]"
                            : "bg-[var(--foreground-tertiary)] text-white")
                      : "bg-[var(--primary)] text-white"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-1">
                    <span className="text-[var(--foreground)] font-medium leading-relaxed">{option}</span>
                  </div>
                  {showResult && option === question.correctAnswer && (
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  )}
                  {showResult && option === selectedAnswer && option !== question.correctAnswer && (
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && showResult && feedback && (
            <div className={`mt-6 p-4 rounded-xl animate-fade-in ${
              feedback.isCorrect 
                ? "bg-[var(--success)]/10 border border-[var(--success)]/20" 
                : "bg-[var(--error)]/10 border border-[var(--error)]/20"
            }`}>
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  feedback.isCorrect ? "bg-[var(--success)]" : "bg-[var(--error)]"
                }`}>
                  {feedback.isCorrect ? (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold mb-1 ${
                    feedback.isCorrect ? "text-[var(--success)]" : "text-[var(--error)]"
                  }`}>
                    {feedback.isCorrect ? "Correct!" : "Incorrect!"}
                  </div>
                  {feedback.explanation && (
                    <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                      {feedback.explanation}
                    </p>
                  )}
                  {!feedback.explanation && (
                    <p className="text-sm text-[var(--foreground-secondary)]">
                      {feedback.isCorrect 
                        ? `Great job! You earned ${currentSession ? (currentSession.questions[currentSession.currentQuestion].difficulty === "easy" ? "10" : currentSession.questions[currentSession.currentQuestion].difficulty === "medium" ? "20" : "30") : "10"} points.` 
                        : "The correct answer was highlighted above."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Keyboard Navigation Hints */}
        <div className="text-center mt-6 text-xs text-[var(--foreground-tertiary)]">
          Use number keys 1-4 to select answers quickly
        </div>
      </div>
    </div>
  );
}
