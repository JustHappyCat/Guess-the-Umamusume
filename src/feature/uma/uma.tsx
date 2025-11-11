"use client";

import { useGame } from "@/contexts/GameContext";
import GameStart from "@/components/ui/GameStart";
import GameQuestion from "@/components/ui/GameQuestion";
import GameResults from "@/components/ui/GameResults";

export default function Uma() {
  const { currentSession, nextQuestion } = useGame();

  // If no active session, show game start
  if (!currentSession) {
    return <GameStart />;
  }

  // If game is completed, show results
  if (currentSession.isCompleted) {
    return <GameResults />;
  }

  // Get current question
  const currentQuestion = currentSession.questions[currentSession.currentQuestion];
  
  const handleAnswer = (answer: string) => {
    void answer;
    // Game state is already handled in GameQuestion component
    // Just wait for the delay then move to next question
    setTimeout(() => {
      nextQuestion();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <GameQuestion
        question={currentQuestion}
        questionNumber={currentSession.currentQuestion + 1}
        totalQuestions={currentSession.totalQuestions}
        onAnswer={handleAnswer}
        showFeedback={true}
      />
    </div>
  );
}
