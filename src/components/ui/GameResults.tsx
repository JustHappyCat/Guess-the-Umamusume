"use client";

import { useGame } from "@/contexts/GameContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GameResults() {
  const { currentSession, gameStats, resetGame } = useGame();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateScore, setAnimateScore] = useState(0);

  useEffect(() => {
    if (currentSession?.isCompleted) {
      setShowConfetti(true);
      
      // Animate score counter
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;
      const targetScore = currentSession.score;
      const increment = targetScore / steps;
      let currentScore = 0;
      
      const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
          setAnimateScore(targetScore);
          clearInterval(timer);
        } else {
          setAnimateScore(Math.floor(currentScore));
        }
      }, stepDuration);

      // Hide confetti after animation
      const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
      
      return () => {
        clearInterval(timer);
        clearTimeout(confettiTimer);
      };
    }
  }, [currentSession?.score, currentSession?.isCompleted]);

  if (!currentSession?.isCompleted) {
    return null;
  }

  const correctAnswers = currentSession.questions.filter(q => q.isCorrect).length;
  const accuracy = Math.round((correctAnswers / currentSession.totalQuestions) * 100);
  const timeTaken = currentSession.endTime && currentSession.startTime 
    ? Math.floor((currentSession.endTime.getTime() - currentSession.startTime.getTime()) / 1000)
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceRating = (accuracy: number) => {
    if (accuracy >= 90) return { text: "Perfect!", color: "text-[var(--accent-gold)]", icon: "🏆" };
    if (accuracy >= 80) return { text: "Excellent!", color: "text-[var(--success)]", icon: "🌟" };
    if (accuracy >= 70) return { text: "Good Job!", color: "text-[var(--primary)]", icon: "👍" };
    if (accuracy >= 60) return { text: "Not Bad!", color: "text-[var(--warning)]", icon: "👌" };
    return { text: "Keep Trying!", color: "text-[var(--error)]", icon: "💪" };
  };

  const rating = getPerformanceRating(accuracy);

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti />
        </div>
      )}

      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4 animate-bounce">{rating.icon}</div>
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
            Game Complete!
          </h1>
          <div className={`text-2xl font-semibold ${rating.color} animate-scale-in`}>
            {rating.text}
          </div>
        </div>

        {/* Main Score Card */}
        <div className="card max-w-2xl mx-auto mb-8 animate-scale-in" style={{ animationDelay: "300ms" }}>
          <div className="text-center">
            <div className="text-6xl font-bold text-[var(--accent-gold)] mb-2 animate-slide-in" style={{ animationDelay: "600ms" }}>
              {animateScore}
            </div>
            <div className="text-lg text-[var(--foreground-secondary)] mb-6">Total Score</div>
            
            {/* Performance Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--success)]">{correctAnswers}</div>
                <div className="text-sm text-[var(--foreground-secondary)]">Correct</div>
                <div className="text-xs text-[var(--foreground-tertiary)]">out of {currentSession.totalQuestions}</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary)]">{accuracy}%</div>
                <div className="text-sm text-[var(--foreground-secondary)]">Accuracy</div>
                <div className="w-full bg-[var(--card-border)] rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-2000 ${
                      accuracy >= 80 ? "bg-[var(--success)]" : 
                      accuracy >= 60 ? "bg-[var(--warning)]" : "bg-[var(--error)]"
                    }`}
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--accent-red)]">{formatTime(timeTaken)}</div>
                <div className="text-sm text-[var(--foreground-secondary)]">Time</div>
                <div className="text-xs text-[var(--foreground-tertiary)]">average per question</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Game Stats */}
          <div className="card animate-slide-in" style={{ animationDelay: "900ms" }}>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Game Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[var(--foreground-secondary)]">Streak</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[var(--accent-gold)]">{currentSession.maxStreak}</span>
                  <svg className="w-4 h-4 text-[var(--accent-gold)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[var(--foreground-secondary)]">Mode</span>
                <span className="font-medium text-[var(--foreground)] capitalize">{currentSession.mode}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[var(--foreground-secondary)]">Difficulty</span>
                <span className="font-medium text-[var(--foreground)] capitalize">
                  {currentSession.questions[0]?.difficulty}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[var(--foreground-secondary)]">Questions</span>
                <span className="font-medium text-[var(--foreground)]">{currentSession.totalQuestions}</span>
              </div>
            </div>
          </div>

          {/* Overall Stats */}
          <div className="card animate-slide-in" style={{ animationDelay: "1200ms" }}>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">All Time Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[var(--foreground-secondary)]">Games Played</span>
                <span className="font-bold text-[var(--primary)]">{gameStats.totalGamesPlayed}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[var(--foreground-secondary)]">Best Streak</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[var(--accent-gold)]">{gameStats.bestStreak}</span>
                  <svg className="w-4 h-4 text-[var(--accent-gold)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[var(--foreground-secondary)]">Average Score</span>
                <span className="font-bold text-[var(--success)]">{gameStats.averageScore}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[var(--foreground-secondary)]">Total Correct</span>
                <span className="font-bold text-[var(--accent-gold)]">{gameStats.totalCorrect}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        {gameStats.achievements.length > 0 && (
          <div className="card mb-8 animate-fade-in" style={{ animationDelay: "1500ms" }}>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--accent-gold)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Achievements Unlocked
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gameStats.achievements.map((achievement) => (
                <div key={achievement} className="flex items-center gap-3 p-3 bg-[var(--card-hover)] rounded-lg">
                  <div className="w-8 h-8 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--primary-dark)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="font-medium text-[var(--foreground)] capitalize">
                    {achievement.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "1800ms" }}>
          <button
            onClick={resetGame}
            className="btn btn-primary px-8 py-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Play Again
          </button>
          
          <button
            onClick={resetGame}
            className="btn btn-outline px-8 py-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Game
          </button>
          
          <Link
            href="/"
            className="btn btn-accent px-8 py-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Main Menu
          </Link>
        </div>

        {/* Share Score */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: "2100ms" }}>
          <div className="card max-w-md mx-auto">
            <h4 className="text-lg font-semibold text-[var(--foreground)] mb-3">Share Your Score</h4>
            <div className="bg-[var(--background-tertiary)] p-3 rounded-lg text-sm font-mono text-[var(--foreground-secondary)] mb-3">
              I scored {animateScore} points ({accuracy}% accuracy) in Guess the Umamusume! 🏆
            </div>
            <button
              onClick={() => {
                const text = `I scored ${animateScore} points (${accuracy}% accuracy) in Guess the Umamusume! 🏆`;
                if (navigator.share) {
                  navigator.share({ text });
                } else {
                  navigator.clipboard.writeText(text);
                  alert("Score copied to clipboard!");
                }
              }}
              className="btn btn-outline w-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple confetti component
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-[var(--accent-gold)] animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
}
