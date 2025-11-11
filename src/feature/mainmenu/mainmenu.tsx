"use client";

import Link from "next/link";
import { useState } from "react";
import GameInstructions from "../../components/ui/GameInstructions";

const gameModes = [
  {
    id: "uma-mode",
    title: "Guess the Uma",
    description: "Identify the horse racing characters",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    href: "/uma",
    mode: "uma",
    color: "bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-gold-dark)]",
    borderColor: "border-[var(--accent-gold)]",
    features: ["Character Images", "Multiple Choice", "Score Tracking"]
  },
  {
    id: "musume-mode",
    title: "Guess the Musume",
    description: "Test your knowledge of character personalities",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    href: "/musume",
    mode: "musume",
    color: "bg-gradient-to-br from-[var(--accent-red)] to-[var(--accent-red-dark)]",
    borderColor: "border-[var(--accent-red)]",
    features: ["Personality Clues", "Bio Questions", "Difficulty Levels"]
  },
  {
    id: "mixed-mode",
    title: "Mixed Challenge",
    description: "Combine both modes for the ultimate test",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: "/mixed",
    mode: "mixed",
    color: "bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]",
    borderColor: "border-[var(--primary)]",
    features: ["Combined Gameplay", "Advanced Levels", "Achievements"]
  }
];

export default function MainMenu() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [focusedCard, setFocusedCard] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleCardClick = (mode: string) => {
    // Use a custom data attribute or state to start the game
    // For now, we'll navigate to the route which will handle game state
    window.location.href = mode === "uma" ? "/uma" : mode === "musume" ? "/musume" : "/mixed";
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="container max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-gradient mb-6 font-bold">
              Guess the Umamusume
            </h1>
            <p className="text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto leading-relaxed">
              Test your knowledge of Umamusume characters! Choose your game mode and see how well you know your favorite racing horses.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                <div className="w-2 h-2 bg-[var(--accent-gold)] rounded-full animate-pulse"></div>
                <span>Multiple Difficulty Levels</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                <div className="w-2 h-2 bg-[var(--accent-red)] rounded-full animate-pulse"></div>
                <span>Real-time Scoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse"></div>
                <span>Progress Tracking</span>
              </div>
            </div>
          </div>

          {/* Game Mode Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gameModes.map((mode, index) => (
              <div
                key={mode.id}
                className={`card card-interactive relative overflow-hidden animate-scale-in group cursor-pointer`}
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(mode.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onFocus={() => setFocusedCard(mode.id)}
                onBlur={() => setFocusedCard(null)}
                tabIndex={0}
                role="button"
                aria-label={`${mode.title} - ${mode.description}`}
                onClick={() => handleCardClick(mode.mode)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(mode.mode);
                  }
                }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 ${mode.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10 p-6">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--card)] border-2 ${mode.borderColor} mb-6 transition-all duration-300 ${
                    hoveredCard === mode.id || focusedCard === mode.id ? 'scale-110 shadow-lg' : ''
                  }`}>
                    <div className="text-[var(--primary)]">
                      {mode.icon}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {mode.title}
                  </h3>
                  <p className="text-[var(--foreground-secondary)] mb-6 leading-relaxed">
                    {mode.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {mode.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-[var(--foreground-tertiary)]">
                        <div className="w-1.5 h-1.5 bg-[var(--accent-gold)] rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <button
                    className={`btn btn-primary w-full justify-center group-hover:shadow-lg transform group-hover:-translate-y-0.5 transition-all duration-300`}
                    aria-label={`Play ${mode.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(mode.mode);
                    }}
                  >
                    Start Playing
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 border-2 ${mode.borderColor} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="card glass max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                How to Play
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-[var(--foreground-secondary)]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--accent-gold)] rounded-full flex items-center justify-center text-[var(--primary-dark)] font-bold text-sm">
                    1
                  </div>
                  <span>Choose a game mode</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--accent-red)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <span>Answer the questions</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <span>Check your score</span>
                </div>
              </div>
            </div>
          </div>

          {/* Help and Instructions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in" style={{ animationDelay: '750ms' }}>
            <button
              onClick={() => setShowInstructions(true)}
              className="btn btn-outline px-6 py-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Game Instructions
            </button>
            
            <Link
              href="#help"
              className="btn btn-outline px-6 py-2"
              onClick={(e) => {
                e.preventDefault();
                setShowInstructions(true);
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Need Help?
            </Link>
          </div>

          {/* Keyboard Navigation Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-[var(--foreground-tertiary)]">
              Use Tab to navigate cards, Enter or Space to select
            </p>
          </div>
        </div>
      </div>

      {/* Game Instructions Modal */}
      <GameInstructions
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </>
  );
}