export const calculateWPM = (correctChars: number, timeInSeconds: number): number => {
  if (timeInSeconds === 0) return 0;
  // Standard: 5 characters = 1 word
  const words = correctChars / 5;
  const minutes = timeInSeconds / 60;
  return Math.round(words / minutes);
};

export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const saveTestResult = (result: any) => {
  const results = getTestResults();
  results.push(result);
  localStorage.setItem('typingTestResults', JSON.stringify(results));
};

export const getTestResults = (): any[] => {
  const results = localStorage.getItem('typingTestResults');
  return results ? JSON.parse(results) : [];
};

export const getAverageWPM = (): number => {
  const results = getTestResults();
  if (results.length === 0) return 0;
  const total = results.reduce((sum, result) => sum + result.wpm, 0);
  return Math.round(total / results.length);
};

export const getBestWPM = (): number => {
  const results = getTestResults();
  if (results.length === 0) return 0;
  return Math.max(...results.map(r => r.wpm));
};
