"use client";

import { useState } from "react";
import Link from "next/link";

interface GameInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameInstructions({ isOpen, onClose }: GameInstructionsProps) {
  const [activeSection, setActiveSection] = useState("overview");

  if (!isOpen) return null;

  const sections = [
    {
      id: "overview",
      title: "Game Overview",
      icon: "🎯",
      content: (
        <div className="space-y-4">
            <p className="text-[var(--foreground-secondary)] leading-relaxed">
            Welcome to Guess the Umamusume! This is a trivia game where you&apos;ll test your knowledge of Umamusume characters from the popular mobile game and anime series.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-4 bg-[var(--card-hover)]">
              <h4 className="font-semibold text-[var(--foreground)] mb-2">🎨 Visual Mode</h4>
              <p className="text-sm text-[var(--foreground-secondary)]">
                Identify characters from their images. Look for unique features, expressions, and outfits to make your guess.
              </p>
            </div>
            <div className="card p-4 bg-[var(--card-hover)]">
              <h4 className="font-semibold text-[var(--foreground)] mb-2">📚 Bio Mode</h4>
              <p className="text-sm text-[var(--foreground-secondary)]">
                Test your knowledge of character personalities, stories, and background information.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "gameplay",
      title: "How to Play",
      icon: "🎮",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
              <span className="w-6 h-6 bg-[var(--accent-gold)] rounded-full flex items-center justify-center text-[var(--primary-dark)] text-sm font-bold">1</span>
              Choose Your Game
            </h4>
            <div className="ml-8 space-y-2">
              <p className="text-[var(--foreground-secondary)]">Select from three game modes:</p>
              <ul className="space-y-1 text-sm text-[var(--foreground-secondary)]">
                <li>• <strong>Guess the Uma:</strong> Image-based character identification</li>
                <li>• <strong>Guess the Musume:</strong> Personality and bio questions</li>
                <li>• <strong>Mixed Challenge:</strong> Combination of both modes</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
              <span className="w-6 h-6 bg-[var(--accent-red)] rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
              Configure Settings
            </h4>
            <div className="ml-8 space-y-2">
              <p className="text-[var(--foreground-secondary)]">Customize your experience:</p>
              <ul className="space-y-1 text-sm text-[var(--foreground-secondary)]">
                <li>• <strong>Difficulty:</strong> Easy (10pts), Medium (20pts), Hard (30pts)</li>
                <li>• <strong>Questions:</strong> Choose 5, 10, 15, or 20 questions</li>
                <li>• <strong>Streak Bonus:</strong> Correct answers build streaks for higher points</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
              <span className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
              Answer Questions
            </h4>
            <div className="ml-8 space-y-2">
              <p className="text-[var(--foreground-secondary)]">Gameplay tips:</p>
              <ul className="space-y-1 text-sm text-[var(--foreground-secondary)]">
                <li>• Read questions carefully</li>
                <li>• Study images closely in visual mode</li>
                <li>• Consider personality traits in bio mode</li>
                <li>• Use keyboard shortcuts (1-4) for quick selection</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
              <span className="w-6 h-6 bg-[var(--success)] rounded-full flex items-center justify-center text-white text-sm font-bold">4</span>
              View Results
            </h4>
            <div className="ml-8 space-y-2">
              <p className="text-[var(--foreground-secondary)]">After completion, you&apos;ll see:</p>
              <ul className="space-y-1 text-sm text-[var(--foreground-secondary)]">
                <li>• Final score and accuracy percentage</li>
                <li>• Time taken and question breakdown</li>
                <li>• Achievement unlocks</li>
                <li>• Overall statistics tracking</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "scoring",
      title: "Scoring System",
      icon: "⭐",
      content: (
        <div className="space-y-6">
          <div className="card p-6 bg-[var(--card-hover)]">
            <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--accent-gold)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Base Points
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                <div className="text-2xl font-bold text-[var(--success)]">10</div>
                <div className="text-sm text-[var(--foreground-secondary)]">Easy Questions</div>
              </div>
              <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                <div className="text-2xl font-bold text-[var(--accent-gold)]">20</div>
                <div className="text-sm text-[var(--foreground-secondary)]">Medium Questions</div>
              </div>
              <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                <div className="text-2xl font-bold text-[var(--accent-red)]">30</div>
                <div className="text-sm text-[var(--foreground-secondary)]">Hard Questions</div>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-[var(--card-hover)]">
            <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--accent-gold)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Streak Multiplier
            </h4>
            <p className="text-[var(--foreground-secondary)] mb-4">
              Answer questions correctly consecutively to build streaks and earn bonus points:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--foreground-secondary)]">5 in a row:</span>
                <span className="text-[var(--success)] font-medium">1.5x multiplier</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--foreground-secondary)]">10 in a row:</span>
                <span className="text-[var(--success)] font-medium">2x multiplier (max)</span>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-[var(--card-hover)]">
            <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">Achievement Points</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg">
                <div className="w-8 h-8 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
                  🏆
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[var(--foreground)]">Perfect Game</div>
                  <div className="text-sm text-[var(--foreground-secondary)]">Answer all questions correctly</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg">
                <div className="w-8 h-8 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
                  🔥
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[var(--foreground)]">Streak Master</div>
                  <div className="text-sm text-[var(--foreground-secondary)]">Achieve a 10+ streak</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg">
                <div className="w-8 h-8 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
                  ⚡
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[var(--foreground)]">Speed Runner</div>
                  <div className="text-sm text-[var(--foreground-secondary)]">Complete a game in under 1 minute</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "tips",
      title: "Pro Tips",
      icon: "💡",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 bg-[var(--card-hover)]">
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <span className="text-2xl">👁️</span>
                Visual Mode Tips
              </h4>
              <ul className="space-y-3 text-sm text-[var(--foreground-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-gold)] font-bold">•</span>
                  Look for unique hair colors and styles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-gold)] font-bold">•</span>
                  Notice facial expressions and eye shapes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-gold)] font-bold">•</span>
                  Pay attention to clothing and accessories
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-gold)] font-bold">•</span>
                  Consider the character&apos;s racing theme
                </li>
              </ul>
            </div>

            <div className="card p-6 bg-[var(--card-hover)]">
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                Bio Mode Tips
              </h4>
              <ul className="space-y-3 text-sm text-[var(--foreground-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-red)] font-bold">•</span>
                  Remember character personalities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-red)] font-bold">•</span>
                  Consider their backstories and origins
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-red)] font-bold">•</span>
                  Think about their relationships with others
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-red)] font-bold">•</span>
                  Recall their achievements and victories
                </li>
              </ul>
            </div>
          </div>

          <div className="card p-6 bg-[var(--card-hover)]">
            <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              General Strategy
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-[var(--foreground)] mb-2">Quick Selection</h5>
                <ul className="space-y-1 text-sm text-[var(--foreground-secondary)]">
                  <li>• Use keyboard numbers 1-4 for faster answers</li>
                  <li>• Don&apos;t overthink - go with your first instinct</li>
                  <li>• Trust your knowledge of the characters</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-[var(--foreground)] mb-2">Streak Building</h5>
                <ul className="space-y-1 text-sm text-[var(--foreground-secondary)]">
                  <li>• Start with easier questions if struggling</li>
                  <li>• Maintain focus to build streaks</li>
                  <li>• Higher streaks = more points overall</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "controls",
      title: "Controls & Navigation",
      icon: "⌨️",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 bg-[var(--card-hover)]">
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">Keyboard Shortcuts</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-[var(--background)] rounded">
                  <span className="text-sm text-[var(--foreground-secondary)]">Select Answer</span>
                  <kbd className="px-2 py-1 bg-[var(--card)] border rounded text-xs font-mono">1-4</kbd>
                </div>
                <div className="flex justify-between items-center p-2 bg-[var(--background)] rounded">
                  <span className="text-sm text-[var(--foreground-secondary)]">Next Question</span>
                  <kbd className="px-2 py-1 bg-[var(--card)] border rounded text-xs font-mono">Enter</kbd>
                </div>
                <div className="flex justify-between items-center p-2 bg-[var(--background)] rounded">
                  <span className="text-sm text-[var(--foreground-secondary)]">Navigate Cards</span>
                  <kbd className="px-2 py-1 bg-[var(--card)] border rounded text-xs font-mono">Tab</kbd>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-[var(--card-hover)]">
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">Mouse/Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                  <span>Click answer options to select</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                  <span>Tap theme toggle to switch modes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                  <span>Swipe on mobile for navigation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-[var(--card-hover)]">
            <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">Accessibility Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                <div className="text-2xl mb-2">🔊</div>
                <h5 className="font-medium text-[var(--foreground)] mb-1">Screen Reader</h5>
                <p className="text-xs text-[var(--foreground-secondary)]">Full ARIA support for screen readers</p>
              </div>
              <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <h5 className="font-medium text-[var(--foreground)] mb-1">High Contrast</h5>
                <p className="text-xs text-[var(--foreground-secondary)]">Optimized for visual accessibility</p>
              </div>
              <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                <div className="text-2xl mb-2">⌨️</div>
                <h5 className="font-medium text-[var(--foreground)] mb-1">Keyboard Only</h5>
                <p className="text-xs text-[var(--foreground-secondary)]">Complete keyboard navigation</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-[var(--overlay)] flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--card)] rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--card-border)]">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Game Instructions</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors"
            aria-label="Close instructions"
          >
            <svg className="w-6 h-6 text-[var(--foreground-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(90vh-120px)]">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[var(--card-border)] overflow-y-auto">
            <nav className="p-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-[var(--primary)] text-white'
                      : 'hover:bg-[var(--card-hover)] text-[var(--foreground-secondary)]'
                  }`}
                  aria-pressed={activeSection === section.id}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {sections.find(section => section.id === activeSection)?.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[var(--card-border)] bg-[var(--background-secondary)]">
          <Link 
            href="/" 
            className="btn btn-outline px-6 py-2"
            onClick={onClose}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Menu
          </Link>
          
          <button
            onClick={onClose}
            className="btn btn-primary px-6 py-2"
          >
            Start Playing
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
