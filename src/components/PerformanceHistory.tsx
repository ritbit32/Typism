import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { getTestResults, getAverageWPM, getBestWPM } from '@/utils/typingCalculations';
import { TestResult } from '@/types/typing';
import { TrendingUp, Trophy, Target, Calendar } from 'lucide-react';

const PerformanceHistory = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [avgWPM, setAvgWPM] = useState(0);
  const [bestWPM, setBestWPM] = useState(0);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    const data = getTestResults();
    setResults(data.reverse()); // Show newest first
    setAvgWPM(getAverageWPM());
    setBestWPM(getBestWPM());
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="font-semibold">Average WPM</h3>
          </div>
          <p className="text-4xl font-bold text-primary">{avgWPM}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-success" />
            <h3 className="font-semibold">Best WPM</h3>
          </div>
          <p className="text-4xl font-bold text-success">{bestWPM}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6 text-accent" />
            <h3 className="font-semibold">Total Tests</h3>
          </div>
          <p className="text-4xl font-bold text-accent">{results.length}</p>
        </Card>
      </div>

      {/* Results List */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Recent Tests
        </h3>

        {results.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-2">No tests completed yet</p>
            <p className="text-sm">Take your first test to see your progress here!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.slice(0, 10).map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/70 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">{result.wpm}</span>
                      <span className="text-sm text-muted-foreground ml-1">WPM</span>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div>
                      <span className="text-lg font-semibold">{result.accuracy}%</span>
                      <span className="text-sm text-muted-foreground ml-1">accuracy</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {result.category} • {formatDate(result.date)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{Math.floor(result.duration / 60)}m {result.duration % 60}s</div>
                  <div className="text-xs text-muted-foreground">{result.errors} errors</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default PerformanceHistory;
