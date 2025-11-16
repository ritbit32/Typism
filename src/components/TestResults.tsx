import { Button } from './ui/button';
import { Card } from './ui/card';
import { Trophy, Target, Clock, AlertCircle, RotateCcw, Home } from 'lucide-react';
import { TestResult } from '@/types/typing';
import { formatTime } from '@/utils/typingCalculations';

interface TestResultsProps {
  result: TestResult;
  onReset: () => void;
  onBack: () => void;
}

const TestResults = ({ result, onReset, onBack }: TestResultsProps) => {
  const getWPMRating = (wpm: number) => {
    if (wpm >= 80) return { text: 'Excellent!', color: 'text-success' };
    if (wpm >= 60) return { text: 'Great!', color: 'text-primary' };
    if (wpm >= 40) return { text: 'Good', color: 'text-accent' };
    return { text: 'Keep Practicing', color: 'text-muted-foreground' };
  };

  const rating = getWPMRating(result.wpm);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <Card className="max-w-2xl w-full p-8 space-y-6">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-primary animate-bounce" />
          <h2 className="text-3xl font-bold mb-2">Test Complete!</h2>
          <p className={`text-xl font-semibold ${rating.color}`}>{rating.text}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="metric-card">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Words Per Minute</span>
            </div>
            <div className="text-4xl font-bold text-primary">{result.wpm}</div>
          </div>

          <div className="metric-card">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Accuracy</span>
            </div>
            <div className="text-4xl font-bold text-success">{result.accuracy}%</div>
          </div>

          <div className="metric-card">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Time</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{formatTime(result.duration)}</div>
          </div>

          <div className="metric-card">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-error" />
              <span className="text-sm text-muted-foreground">Errors</span>
            </div>
            <div className="text-2xl font-bold text-error">{result.errors}</div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold mb-2">Performance Details</h3>
          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span className="text-muted-foreground">Correct Characters:</span>
              <span className="font-medium">{result.correctChars}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted-foreground">Total Characters:</span>
              <span className="font-medium">{result.totalChars}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-medium">{result.category}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onReset}
            className="flex-1 gap-2"
            size="lg"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 gap-2"
            size="lg"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TestResults;
