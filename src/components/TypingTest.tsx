import { useState, useEffect, useRef } from 'react';
import { TestSettings, TestStatus, TextPassage } from '@/types/typing';
import { calculateWPM, calculateAccuracy, formatTime, saveTestResult } from '@/utils/typingCalculations';
import { textPassages } from '@/data/textPassages';
import { Button } from './ui/button';
import { Keyboard, RotateCcw } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import TestResults from './TestResults';

interface TypingTestProps {
  settings: TestSettings;
  onComplete: () => void;
}

const TypingTest = ({ settings, onComplete }: TypingTestProps) => {
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [currentText, setCurrentText] = useState<TextPassage | null>(null);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(settings.duration);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [correctChars, setCorrectChars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [finalResults, setFinalResults] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Select a random text passage based on category
    const filteredTexts = textPassages.filter(
      p => settings.category === 'All' || p.category === settings.category
    );
    const randomText = filteredTexts[Math.floor(Math.random() * filteredTexts.length)];
    setCurrentText(randomText);
  }, [settings.category]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (testStatus === 'active' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [testStatus, timeLeft]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && testStatus === 'active') {
        completeTest();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [testStatus, userInput]);

  const startTest = () => {
    setTestStatus('active');
    setStartTime(Date.now());
    setTimeLeft(settings.duration);
    setUserInput('');
    setCorrectChars(0);
    setErrors(0);
    setShowResults(false);
    inputRef.current?.focus();
  };

  const completeTest = () => {
    if (testStatus !== 'active') return;
    
    setTestStatus('completed');
    const timeElapsed = settings.duration - timeLeft;
    const wpm = calculateWPM(correctChars, timeElapsed);
    const accuracy = calculateAccuracy(correctChars, userInput.length);
    
    const result = {
      id: Date.now().toString(),
      wpm,
      accuracy,
      duration: timeElapsed,
      date: new Date(),
      category: settings.category,
      errors,
      correctChars,
      totalChars: userInput.length
    };

    saveTestResult(result);
    setFinalResults(result);
    setShowResults(true);
  };

  const resetTest = () => {
    setTestStatus('idle');
    setUserInput('');
    setTimeLeft(settings.duration);
    setCorrectChars(0);
    setErrors(0);
    setShowResults(false);
    setFinalResults(null);
    
    // Select new text
    const filteredTexts = textPassages.filter(
      p => settings.category === 'All' || p.category === settings.category
    );
    const randomText = filteredTexts[Math.floor(Math.random() * filteredTexts.length)];
    setCurrentText(randomText);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (testStatus !== 'active') return;

    const value = e.target.value;
    setUserInput(value);

    // Calculate correct characters
    let correct = 0;
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === currentText?.text[i]) {
        correct++;
      } else {
        errorCount++;
      }
    }
    setCorrectChars(correct);
    setErrors(errorCount);

    // Check if test is complete
    if (value.length >= (currentText?.text.length || 0)) {
      completeTest();
    }
  };

  const renderText = () => {
    if (!currentText) return null;

    return (
      <div className="typing-text text-center max-w-4xl mx-auto mb-8">
        {currentText.text.split('').map((char, index) => {
          let className = 'transition-colors duration-100';
          
          if (index < userInput.length) {
            if (userInput[index] === char) {
              className += ' char-correct';
            } else {
              className += ' char-incorrect';
            }
          } else if (index === userInput.length) {
            className += ' char-current';
          } else {
            className += ' text-muted-foreground';
          }

          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  const currentWPM = testStatus === 'active' 
    ? calculateWPM(correctChars, settings.duration - timeLeft)
    : 0;
  const currentAccuracy = testStatus === 'active'
    ? calculateAccuracy(correctChars, userInput.length)
    : 100;

  if (showResults && finalResults) {
    return <TestResults result={finalResults} onReset={resetTest} onBack={onComplete} />;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Keyboard className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Typing Speed Test
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Test your typing speed and accuracy
          </p>
        </div>

        {/* Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="metric-card">
            <div className="text-sm text-muted-foreground mb-1">Time Left</div>
            <div className="text-3xl font-bold text-primary">{formatTime(timeLeft)}</div>
          </div>
          <div className="metric-card">
            <div className="text-sm text-muted-foreground mb-1">WPM</div>
            <div className="text-3xl font-bold text-foreground">{currentWPM}</div>
          </div>
          <div className="metric-card">
            <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
            <div className="text-3xl font-bold text-foreground">{currentAccuracy}%</div>
          </div>
          <div className="metric-card">
            <div className="text-sm text-muted-foreground mb-1">Errors</div>
            <div className="text-3xl font-bold text-error">{errors}</div>
          </div>
        </div>

        {/* Typing Area */}
        <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border mb-6">
          {renderText()}

          {testStatus === 'idle' ? (
            <div className="text-center">
              <Button
                size="lg"
                onClick={startTest}
                className="gradient-primary text-lg px-8 py-6 hover:scale-105 transition-transform"
              >
                Start Test
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Press ESC to end the test early
              </p>
            </div>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="w-full text-2xl font-mono text-center bg-transparent border-2 border-primary rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Start typing..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          )}
        </div>

        {/* Action Buttons */}
        {testStatus !== 'idle' && (
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={resetTest}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Test
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;
