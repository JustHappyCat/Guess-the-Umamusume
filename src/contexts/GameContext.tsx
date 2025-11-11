"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface GameQuestion {
  id: string;
  type: "image" | "bio" | "mixed";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  isAnswered?: boolean;
  isCorrect?: boolean;
  userAnswer?: string;
}

export interface GameSession {
  id: string;
  mode: "uma" | "musume" | "mixed";
  score: number;
  totalQuestions: number;
  currentQuestion: number;
  questions: GameQuestion[];
  isCompleted: boolean;
  startTime: Date;
  endTime?: Date;
  streak: number;
  maxStreak: number;
}

export interface GameStats {
  totalGamesPlayed: number;
  totalCorrect: number;
  totalQuestions: number;
  averageScore: number;
  bestStreak: number;
  favoriteDifficulty: "easy" | "medium" | "hard";
  mostPlayedMode: "uma" | "musume" | "mixed";
  achievements: string[];
}

interface GameContextType {
  currentSession: GameSession | null;
  gameStats: GameStats;
  startGame: (mode: "uma" | "musume" | "mixed", difficulty: "easy" | "medium" | "hard", questionCount: number) => void;
  answerQuestion: (selectedAnswer: string) => { isCorrect: boolean; explanation?: string };
  nextQuestion: () => void;
  endGame: () => void;
  resetGame: () => void;
  getProgress: () => { current: number; total: number; percentage: number };
  getTimeElapsed: () => number;
  clearHistory: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_STATS: GameStats = {
  totalGamesPlayed: 0,
  totalCorrect: 0,
  totalQuestions: 0,
  averageScore: 0,
  bestStreak: 0,
  favoriteDifficulty: "easy",
  mostPlayedMode: "uma",
  achievements: []
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);
  const [gameStats, setGameStats] = useState<GameStats>(INITIAL_STATS);

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem("umamusume-game-stats");
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        setGameStats({ ...INITIAL_STATS, ...parsed });
      } catch (error) {
        console.error("Failed to load game stats:", error);
      }
    }
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("umamusume-game-stats", JSON.stringify(gameStats));
  }, [gameStats]);

  const startGame = (mode: "uma" | "musume" | "mixed", difficulty: "easy" | "medium" | "hard", questionCount: number) => {
    // Generate questions based on mode and difficulty
    const questions = generateQuestions(mode, difficulty, questionCount);
    
    const newSession: GameSession = {
      id: `session-${Date.now()}`,
      mode,
      score: 0,
      totalQuestions: questionCount,
      currentQuestion: 0,
      questions,
      isCompleted: false,
      startTime: new Date(),
      streak: 0,
      maxStreak: 0
    };
    
    setCurrentSession(newSession);
  };

  const answerQuestion = (selectedAnswer: string): { isCorrect: boolean; explanation?: string } => {
    if (!currentSession) {
      throw new Error("No active game session");
    }

    const currentQuestion = currentSession.questions[currentSession.currentQuestion];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    let newStreak = currentSession.streak;
    let newMaxStreak = currentSession.maxStreak;
    
    if (isCorrect) {
      newStreak += 1;
      newMaxStreak = Math.max(newMaxStreak, newStreak);
    } else {
      newStreak = 0;
    }

    const scoreIncrease = calculateScoreIncrease(isCorrect, currentQuestion.difficulty, newStreak);
    
    setCurrentSession(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        score: prev.score + (isCorrect ? scoreIncrease : 0),
        streak: newStreak,
        maxStreak: newMaxStreak,
        questions: prev.questions.map((q, index) => 
          index === prev.currentQuestion 
            ? { ...q, userAnswer: selectedAnswer, isAnswered: true, isCorrect }
            : q
        )
      };
    });

    return { 
      isCorrect, 
      explanation: currentQuestion.explanation 
    };
  };

  const nextQuestion = () => {
    if (!currentSession) return;
    
    if (currentSession.currentQuestion < currentSession.totalQuestions - 1) {
      setCurrentSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        };
      });
    } else {
      endGame();
    }
  };

  const endGame = () => {
    if (!currentSession) return;
    
    const endTime = new Date();
    const timeTaken = endTime.getTime() - currentSession.startTime.getTime();
    
    // Update session
    setCurrentSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        isCompleted: true,
        endTime
      };
    });

    // Update global stats
    setGameStats(prev => {
      const correctAnswers = currentSession.questions.filter(q => q.isCorrect).length;
      const newTotalQuestions = prev.totalQuestions + currentSession.totalQuestions;
      const newTotalCorrect = prev.totalCorrect + correctAnswers;
      const newTotalGames = prev.totalGamesPlayed + 1;
      const newAverageScore = newTotalGames > 0
        ? (prev.averageScore * prev.totalGamesPlayed + (correctAnswers / currentSession.totalQuestions * 100)) / newTotalGames
        : (correctAnswers / currentSession.totalQuestions * 100);
      
      const newAchievements = [...prev.achievements];
      
      // Achievement checks
      if (correctAnswers === currentSession.totalQuestions && !newAchievements.includes("perfect-game")) {
        newAchievements.push("perfect-game");
      }
      if (currentSession.maxStreak >= 10 && !newAchievements.includes("streak-master")) {
        newAchievements.push("streak-master");
      }
      if (timeTaken < 60000 && !newAchievements.includes("speed-runner")) {
        newAchievements.push("speed-runner");
      }
      
      return {
        ...prev,
        totalGamesPlayed: newTotalGames,
        totalCorrect: newTotalCorrect,
        totalQuestions: newTotalQuestions,
        averageScore: Math.round(newAverageScore),
        bestStreak: Math.max(prev.bestStreak, currentSession.maxStreak),
        achievements: newAchievements
      };
    });
  };

  const resetGame = () => {
    setCurrentSession(null);
  };

  const getProgress = () => {
    if (!currentSession) return { current: 0, total: 0, percentage: 0 };
    
    return {
      current: currentSession.currentQuestion + 1,
      total: currentSession.totalQuestions,
      percentage: Math.round(((currentSession.currentQuestion + 1) / currentSession.totalQuestions) * 100)
    };
  };

  const getTimeElapsed = () => {
    if (!currentSession) return 0;
    
    const now = new Date();
    return Math.floor((now.getTime() - currentSession.startTime.getTime()) / 1000);
  };

  const clearHistory = () => {
    setGameStats(INITIAL_STATS);
    localStorage.removeItem("umamusume-game-stats");
  };

  const calculateScoreIncrease = (isCorrect: boolean, difficulty: string, streak: number) => {
    if (!isCorrect) return 0;
    
    const basePoints = {
      "easy": 10,
      "medium": 20,
      "hard": 30
    }[difficulty] || 10;
    
    const streakMultiplier = Math.min(1 + (streak * 0.1), 2); // Max 2x multiplier
    return Math.round(basePoints * streakMultiplier);
  };

  const generateQuestions = (mode: "uma" | "musume" | "mixed", difficulty: "easy" | "medium" | "hard", count: number): GameQuestion[] => {
    // This would typically fetch from a database
    // For now, we'll return mock questions
    const mockQuestions: GameQuestion[] = Array.from({ length: count }, (_, index) => ({
      id: `q-${index}`,
      type: mode === "mixed" ? (index % 2 === 0 ? "image" : "bio") : mode === "uma" ? "image" : "bio",
      question: `Question ${index + 1}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
      difficulty,
      explanation: "This is a sample explanation",
      isAnswered: false,
      isCorrect: false
    }));
    
    return mockQuestions;
  };

  return (
    <GameContext.Provider value={{
      currentSession,
      gameStats,
      startGame,
      answerQuestion,
      nextQuestion,
      endGame,
      resetGame,
      getProgress,
      getTimeElapsed,
      clearHistory
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}