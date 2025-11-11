"use client";

import { useGame } from "@/contexts/GameContext";
import { useState } from "react";
import Link from "next/link";

type ModeOption = "uma" | "musume" | "mixed";
type DifficultyOption = "easy" | "medium" | "hard";

export default function GameStart() {
  const { startGame } = useGame();
  const [selectedMode, setSelectedMode] = useState<ModeOption>("uma");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyOption>("easy");
  const [questionCount, setQuestionCount] = useState(10);

  const handleStartGame = () => {
    startGame(selectedMode, selectedDifficulty, questionCount);
  };

  const gameModes: {
    id: ModeOption;
    title: string;
    description: string;
    icon: string;
    color: string;
  }[] = [
    {
      id: "uma",
      title: "Guess the Uma",
      description: "Identify Umamusume from their images",
      icon: "🐎",
      color: "border-[var(--accent-gold)]"
    },
    {
      id: "musume",
      title: "Guess the Musume",
      description: "Test knowledge of character personalities",
      icon: "👤",
      color: "border-[var(--accent-red)]"
    },
    {
      id: "mixed",
      title: "Mixed Challenge",
      description: "Combine both modes",
      icon: "🎯",
      color: "border-[var(--primary)]"
    }
  ];

  const difficulties: {
    id: DifficultyOption;
    title: string;
    description: string;
    points: string;
  }[] = [
    {
      id: "easy",
      title: "Easy",
      description: "Basic character knowledge",
      points: "10 pts each"
    },
    {
      id: "medium",
      title: "Medium",
      description: "Intermediate details",
      points: "20 pts each"
    },
    {
      id: "hard",
      title: "Hard",
      description: "Deep character lore",
      points: "30 pts each"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
            Configure Your Game
          </h1>
          <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto">
            Choose your game mode, difficulty, and number of questions to begin your Umamusume challenge.
          </p>
        </div>

        {/* Game Configuration */}
        <div className="space-y-8">
          {/* Mode Selection */}
          <div className="card animate-scale-in">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Select Game Mode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gameModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all duration-300 hover:shadow-lg ${
                    selectedMode === mode.id
                      ? `${mode.color} bg-[var(--card-hover)]`
                      : "border-[var(--card-border)] bg-[var(--card)]"
                  }`}
                  aria-pressed={selectedMode === mode.id}
                >
                  <div className="text-2xl mb-2">{mode.icon}</div>
                  <h3 className="font-semibold text-[var(--foreground)]">{mode.title}</h3>
                  <p className="text-sm text-[var(--foreground-secondary)]">{mode.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="card animate-scale-in" style={{ animationDelay: "150ms" }}>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Select Difficulty
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all duration-300 hover:shadow-lg ${
                    selectedDifficulty === difficulty.id
                      ? "border-[var(--primary)] bg-[var(--card-hover)]"
                      : "border-[var(--card-border)] bg-[var(--card)]"
                  }`}
                  aria-pressed={selectedDifficulty === difficulty.id}
                >
                  <h3 className="font-semibold text-[var(--foreground)]">{difficulty.title}</h3>
                  <p className="text-sm text-[var(--foreground-secondary)] mb-1">{difficulty.description}</p>
                  <p className="text-xs text-[var(--accent-gold)] font-medium">{difficulty.points}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="card animate-scale-in" style={{ animationDelay: "300ms" }}>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Number of Questions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[5, 10, 15, 20].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`p-4 border-2 rounded-lg text-center transition-all duration-300 hover:shadow-lg ${
                    questionCount === count
                      ? "border-[var(--accent-gold)] bg-[var(--card-hover)]"
                      : "border-[var(--card-border)] bg-[var(--card)]"
                  }`}
                  aria-pressed={questionCount === count}
                >
                  <div className="text-2xl font-bold text-[var(--foreground)]">{count}</div>
                  <div className="text-sm text-[var(--foreground-secondary)]">Questions</div>
                </button>
              ))}
            </div>
          </div>

          {/* Start Game Button */}
          <div className="text-center animate-scale-in" style={{ animationDelay: "450ms" }}>
            <button
              onClick={handleStartGame}
              className="btn btn-primary btn-lg px-12 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Start Game
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Back to Menu */}
          <div className="text-center animate-scale-in" style={{ animationDelay: "600ms" }}>
            <Link
              href="/"
              className="btn btn-outline px-8 py-3"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Menu
            </Link>
          </div>
        </div>

        {/* Preview Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "750ms" }}>
          <div className="card text-center">
            <div className="text-2xl font-bold text-[var(--primary)]">{questionCount}</div>
            <div className="text-sm text-[var(--foreground-secondary)]">Questions</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-[var(--accent-gold)]">
              {selectedDifficulty === "easy" ? "10" : selectedDifficulty === "medium" ? "20" : "30"}
            </div>
            <div className="text-sm text-[var(--foreground-secondary)]">Points per correct</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-[var(--success)]">
              {Math.round(questionCount * (selectedDifficulty === "easy" ? 10 : selectedDifficulty === "medium" ? 20 : 30) * 1.5)}
            </div>
            <div className="text-sm text-[var(--foreground-secondary)]">Max possible score</div>
          </div>
        </div>
      </div>
    </div>
  );
}
