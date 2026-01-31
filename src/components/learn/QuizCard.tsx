import { useState } from 'react';
import { Check, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import { Question } from '@/data/quizQuestions';

interface QuizCardProps {
  questions: Question[];
  onComplete?: (score: number) => void;
}

export const QuizCard = ({ questions, onComplete }: QuizCardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (!questions || questions.length === 0) {
    return <div className="lisboa-card text-center text-muted-foreground">Loading quiz...</div>;
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSelect = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === question.correct) {
      setScore(score + 50);
      toast.success('+50 points!');
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Reset quiz
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      toast.success(`Quiz complete! You earned ${score} points!`);
      setScore(0);
      if (onComplete) onComplete(score);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="lisboa-card space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <span className="text-sm font-bold text-coral">
          {score} pts
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-lime h-2">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} 
        />
      </div>

      {/* Question */}
      <h3 className="text-lg font-bold text-foreground">
        {question.question}
      </h3>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correct;
          
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              className={cn(
                "p-4 rounded-2xl text-left font-semibold transition-all duration-200",
                "border-2",
                !showResult && "bg-cream border-transparent hover:border-muted-foreground/30",
                showResult && isCorrectOption && "bg-success/20 border-success text-jungle",
                showResult && isSelected && !isCorrectOption && "bg-destructive/20 border-destructive",
                !showResult && "active:scale-95"
              )}
            >
              <div className="flex items-center gap-2">
                {showResult && isCorrectOption && (
                  <Check size={18} strokeWidth={3} className="text-success" />
                )}
                {showResult && isSelected && !isCorrectOption && (
                  <X size={18} strokeWidth={3} className="text-destructive" />
                )}
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {showResult && (
        <button
          onClick={handleNext}
          className="btn-coral w-full flex items-center justify-center gap-2 animate-slide-up"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};
