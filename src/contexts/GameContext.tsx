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

const QUESTION_LIBRARY: Record<"uma" | "musume", Record<"easy" | "medium" | "hard", GameQuestion[]>> = {
  uma: {
    easy: [
      {
        id: "uma-easy-1",
        type: "image",
        // Image placeholder: Special Week portrait in the white-and-blue racing outfit that represents the anime's heroine.
        question: "Which Umamusume is shown here in the white-and-blue racing outfit with a bright pink ribbon?",
        options: ["Special Week", "Silence Suzuka", "Mejiro McQueen", "Tokai Teio"],
        correctAnswer: "Special Week",
        explanation: "Special Week is the protagonist of the main story and is always depicted with a cheerful smile and her signature ribbon.",
        difficulty: "easy",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-easy-2",
        type: "image",
        // Image placeholder: Silence Suzuka art with flowing lavender hair and a calm expression.
        question: "Identify the tall, composed Umamusume with flowing lavender hair and a focused gaze.",
        options: ["Silence Suzuka", "Gold Ship", "Special Week", "Tokai Teio"],
        correctAnswer: "Silence Suzuka",
        explanation: "Silence Suzuka is known for her graceful presence and calm eyes, especially in relaxed portraits.",
        difficulty: "easy",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-easy-3",
        type: "image",
        // Image placeholder: Tokai Teio portrait with energetic pink hair and a determined grin.
        question: "Which Uma is shown here with short pink hair and a determined grin that matches her come-back spirit?",
        options: ["Tokai Teio", "Special Week", "Mejiro McQueen", "Gold Ship"],
        correctAnswer: "Tokai Teio",
        explanation: "Tokai Teio is always drawn with energetic pink hair and a wide smile that reflects her desire to fight on.",
        difficulty: "easy",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-easy-4",
        type: "image",
        // Image placeholder: Gold Ship grinning with mint-green hair and playful accessories.
        question: "Name the whacky Umamusume grinning wildly while sporting long mint-green hair and mismatched socks.",
        options: ["Gold Ship", "Silence Suzuka", "Daiwa Scarlet", "Vodka"],
        correctAnswer: "Gold Ship",
        explanation: "Gold Ship is the comic relief who loves pranks and is drawn with mint-green hair and a cheeky posture.",
        difficulty: "easy",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-easy-5",
        type: "image",
        // Image placeholder: Daiwa Scarlet portrait with fiery red hair staring intensely.
        question: "Which Uma is pictured here with fiery red hair and an intense stare that matches her stubborn rivalry with Special Week?",
        options: ["Daiwa Scarlet", "Mejiro McQueen", "Special Week", "Rice Shower"],
        correctAnswer: "Daiwa Scarlet",
        explanation: "Daiwa Scarlet is recognized by her scarlet hair and determined glare while clashing with the protagonist.",
        difficulty: "easy",
        isAnswered: false,
        isCorrect: false
      }
    ],
    medium: [
      {
        id: "uma-medium-1",
        type: "image",
        // Image placeholder: Kitasan Black standing tall with black-and-gold attire.
        question: "Identify the imposing black-haired Uma who dominates long-distance races in this artwork.",
        options: ["Kitasan Black", "Tokai Teio", "Gold Ship", "Special Week"],
        correctAnswer: "Kitasan Black",
        explanation: "Kitasan Black is the legendary long-distance runner drawn with jet-black hair and golden highlights.",
        difficulty: "medium",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-medium-2",
        type: "image",
        // Image placeholder: Mejiro McQueen in her regal white-and-green attire.
        question: "Which Uma appears here with silvery hair, a poised expression, and the royal Mejiro crest on her uniform?",
        options: ["Mejiro McQueen", "Silence Suzuka", "Vodka", "Taiki Shuttle"],
        correctAnswer: "Mejiro McQueen",
        explanation: "Mejiro McQueen is celebrated for her elegance and is always shown in pristine white and emerald tones.",
        difficulty: "medium",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-medium-3",
        type: "image",
        // Image placeholder: Narita Brian flexing with a fierce pose.
        question: "Which Uma is shown with short auburn hair and a powerful pose that echoes the pride of his rival stable?",
        options: ["Narita Brian", "Agnes Tachyon", "Taiki Shuttle", "Agnes Digital"],
        correctAnswer: "Narita Brian",
        explanation: "Narita Brian is known for his muscular frame and battle-ready stance representing the Brian faction.",
        difficulty: "medium",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-medium-4",
        type: "image",
        // Image placeholder: Taiki Shuttle in aerodynamic sprint gear.
        question: "Name the Uma with platinum hair and a determined face that represents the fast-paced American sprint style.",
        options: ["Taiki Shuttle", "Rice Shower", "Special Week", "Kitasan Black"],
        correctAnswer: "Taiki Shuttle",
        explanation: "Taiki Shuttle is the sprint specialist drawn with a sharp gaze and teal highlights.",
        difficulty: "medium",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-medium-5",
        type: "image",
        // Image placeholder: Rice Shower crying with pale hair and a teardrop detail.
        question: "Which Uma is shown here with pale hair and a teary expression that reflects her dramatic story?",
        options: ["Rice Shower", "Mejiro McQueen", "Vodka", "Silence Suzuka"],
        correctAnswer: "Rice Shower",
        explanation: "Rice Shower is remembered for her tragic comebacks and emotional races.",
        difficulty: "medium",
        isAnswered: false,
        isCorrect: false
      }
    ],
    hard: [
      {
        id: "uma-hard-1",
        type: "image",
        // Image placeholder: Vodka with a cold gaze and silver hair.
        question: "Identify the stoic, silver-haired Uma whose calm gaze hints at her 'Ice Queen' reputation.",
        options: ["Vodka", "Gold Ship", "Special Week", "Taiki Shuttle"],
        correctAnswer: "Vodka",
        explanation: "Vodka's icy demeanor and silver hair earned her the nickname of the princely tactician.",
        difficulty: "hard",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-hard-2",
        type: "image",
        // Image placeholder: Symboli Rudolf standing in regal red-and-gold armor.
        question: "Which Uma is pictured in regal red-and-gold armor, symbolizing her undefeated streak as the Reborn King?",
        options: ["Symboli Rudolf", "Mejiro McQueen", "Kitasan Black", "Narita Brian"],
        correctAnswer: "Symboli Rudolf",
        explanation: "Symboli Rudolf is the legendary champion with royal colors and a crown-like headpiece.",
        difficulty: "hard",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-hard-3",
        type: "image",
        // Image placeholder: Agnes Tachyon with sharp lilac hair and a strategic expression.
        question: "Name the serious Uma with short lilac hair who obsesses over timing and perfect strategy.",
        options: ["Agnes Tachyon", "Mejiro McQueen", "Rice Shower", "Silence Suzuka"],
        correctAnswer: "Agnes Tachyon",
        explanation: "Agnes Tachyon studies every fraction of a second and is drawn with piercing purple eyes.",
        difficulty: "hard",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-hard-4",
        type: "image",
        // Image placeholder: Sakura Bakushin O surrounded by cherry blossoms.
        question: "Which Uma shows bright cherry blossom motifs and is celebrated for her iconic sprint around the turf?",
        options: ["Sakura Bakushin O", "Special Week", "Tokai Teio", "Daiwa Scarlet"],
        correctAnswer: "Sakura Bakushin O",
        explanation: "Sakura Bakushin O is associated with blossom imagery and explosive sprint finishes.",
        difficulty: "hard",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "uma-hard-5",
        type: "image",
        // Image placeholder: Orfevre with flowing silver braids and a triumphant pose.
        question: "Which Uma is depicted with flowing silver braids and a triumphant pose as a Triple Crown champion?",
        options: ["Orfevre", "Silence Suzuka", "Gold Ship", "Vodka"],
        correctAnswer: "Orfevre",
        explanation: "Orfevre is the Triple Crown champion wearing elegant silver braids and a dramatic expression.",
        difficulty: "hard",
        isAnswered: false,
        isCorrect: false
      }
    ]
  },
  musume: {
    easy: [
      {
        id: "musume-easy-1",
        type: "bio",
        question: "Which Umamusume grew up in the countryside and moved to Tracen to win the Tokyo Cup?",
        options: ["Special Week", "Tokai Teio", "Gold Ship", "Daiwa Scarlet"],
        correctAnswer: "Special Week",
        explanation: "Special Week is the heroine who arrived at Tracen Academy with dreams of the Tokyo Cup.",
        difficulty: "easy",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "musume-easy-2",
        type: "bio",
        question: "Which Umamusume rarely speaks but lets her racing do the talking, earning her the nickname 'Silent Runner'?",
        options: ["Silence Suzuka", "Mejiro McQueen", "Rice Shower", "Symboli Rudolf"],
        correctAnswer: "Silence Suzuka",
        explanation: "Silence Suzuka is known for her quiet composure and consistent performances.",
        difficulty: "easy",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "musume-easy-3",
        type: "bio",
        question: "Which Umamusume loves pranks, proclaims herself the 'Pirate Princess,' and keeps the mood light?",
        options: ["Gold Ship", "Vodka", "Special Week", "Kitasan Black"],
        correctAnswer: "Gold Ship",
        explanation: "Gold Ship is the mischievous prankster who claims to be the best pirate ever.",
        difficulty: "easy",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "musume-easy-4",
        type: "bio",
        question: "Which Umamusume is the red-haired rival who challenged Special Week and vowed to never lose?",
        options: ["Daiwa Scarlet", "Mejiro McQueen", "Tokai Teio", "Taiki Shuttle"],
        correctAnswer: "Daiwa Scarlet",
        explanation: "Daiwa Scarlet is the stubborn rival known for her scarlet hair and fierce competitive streak.",
        difficulty: "easy",
        isAnswered: false,
        isCorrect: false
      }
    ],
    medium: [
      {
        id: "musume-medium-1",
        type: "bio",
        question: "Which Umamusume broke her leg during training but made a triumphant return to the Japanese Derby?",
        options: ["Tokai Teio", "Special Week", "Vodka", "Kitasan Black"],
        correctAnswer: "Tokai Teio",
        explanation: "Tokai Teio is famous for her dramatic comeback after a serious injury and her emotional victory.",
        difficulty: "medium",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "musume-medium-2",
        type: "bio",
        question: "Which Umamusume belongs to the Mejiro family, studies classical music, and prizes grace over flashiness?",
        options: ["Mejiro McQueen", "Silence Suzuka", "Gold Ship", "Rice Shower"],
        correctAnswer: "Mejiro McQueen",
        explanation: "Mejiro McQueen prides herself on elegance, etiquette, and a composed racing style.",
        difficulty: "medium",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "musume-medium-3",
        type: "bio",
        question: "Which Umamusume is the veteran long-distance champion nicknamed 'Black Stallion' with a showman personality?",
        options: ["Kitasan Black", "Symboli Rudolf", "Taiki Shuttle", "Narita Brian"],
        correctAnswer: "Kitasan Black",
        explanation: "Kitasan Black dominates the long-distance races and is called the 'Black Stallion' for his glory.",
        difficulty: "medium",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "musume-medium-4",
        type: "bio",
        question: "Which Umamusume from the Brian lineage is quiet, intense, and often compared to a warrior on the track?",
        options: ["Narita Brian", "Agnes Tachyon", "Taiki Shuttle", "Special Week"],
        correctAnswer: "Narita Brian",
        explanation: "Narita Brian is the serious powerhouse raised to resemble a warrior, often in silent focus.",
        difficulty: "medium",
        isAnswered: false,
        isCorrect: false
      }
    ],
    hard: [
      {
        id: "musume-hard-1",
        type: "bio",
        question: "Which Umamusume is nicknamed the 'Prince of the Turf' because of her cool, calculated style?",
        options: ["Vodka", "Gold Ship", "Special Week", "Mejiro McQueen"],
        correctAnswer: "Vodka",
        explanation: "Vodka maintains a calm and analytical facade, earning her the princely nickname.",
        difficulty: "hard",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "musume-hard-2",
        type: "bio",
        question: "Which Umamusume became a sensation in both Japan and the US, representing a sprinting bridge between continents?",
        options: ["Taiki Shuttle", "Daiwa Scarlet", "Rice Shower", "Symboli Rudolf"],
        correctAnswer: "Taiki Shuttle",
        explanation: "Taiki Shuttle is known for her overseas success and sprinting prowess in both countries.",
        difficulty: "hard",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "musume-hard-3",
        type: "bio",
        question: "Which Umamusume's story is marked by several injuries but also by the tearful determination to come back stronger?",
        options: ["Rice Shower", "Special Week", "Silence Suzuka", "Agnes Tachyon"],
        correctAnswer: "Rice Shower",
        explanation: "Rice Shower's tragic tale includes numerous setbacks and emotional comebacks.",
        difficulty: "hard",
        isAnswered: false,
        isCorrect: false
      },
      {
        id: "musume-hard-4",
        type: "bio",
        question: "Which Umamusume constantly uses simulations, data sheets, and battle plans to perfect every fraction of a race?",
        options: ["Agnes Tachyon", "Taiki Shuttle", "Kitasan Black", "Narita Brian"],
        correctAnswer: "Agnes Tachyon",
        explanation: "Agnes Tachyon is obsessed with strategy and timing, always analyzing every move.",
        difficulty: "hard",
        isAnswered: false,
        isCorrect: false
      }
    ]
  }
};

const cloneQuestion = (question: GameQuestion, sequence: number): GameQuestion => ({
  ...question,
  id: `${question.id}-${sequence}`,
  options: [...question.options],
  isAnswered: false,
  isCorrect: false,
  userAnswer: undefined
});

const buildQuestionSet = (pool: GameQuestion[], count: number): GameQuestion[] => {
  if (!pool.length || count <= 0) return [];

  const result: GameQuestion[] = [];
  let pointer = 0;

  while (result.length < count) {
    const template = pool[pointer % pool.length];
    result.push(cloneQuestion(template, result.length + 1));
    pointer += 1;
  }

  return result;
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
    const umaPool = QUESTION_LIBRARY.uma[difficulty];
    const musumePool = QUESTION_LIBRARY.musume[difficulty];

    const pool = mode === "mixed"
      ? [...umaPool, ...musumePool]
      : mode === "uma"
        ? umaPool
        : musumePool;

    return buildQuestionSet(pool, count);
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
