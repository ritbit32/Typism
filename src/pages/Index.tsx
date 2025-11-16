import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Keyboard, History, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import TypingTest from '@/components/TypingTest';
import PerformanceHistory from '@/components/PerformanceHistory';
import TestSettings from '@/components/TestSettings';
import { TestSettings as TestSettingsType } from '@/types/typing';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isTestActive, setIsTestActive] = useState(false);
  const [settings, setSettings] = useState<TestSettingsType>({
    duration: 60,
    category: 'All',
    language: 'English'
  });

  const handleStartTest = () => {
    setIsTestActive(true);
    setActiveTab('test');
  };

  const handleTestComplete = () => {
    setIsTestActive(false);
    setActiveTab('home');
  };

  if (isTestActive) {
    return <TypingTest settings={settings} onComplete={handleTestComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Keyboard className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TypeMaster
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Improve your typing speed and accuracy with real-time feedback and detailed analytics
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="home" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Setup</span>
            </TabsTrigger>
            <TabsTrigger value="test" className="gap-2" disabled={!isTestActive}>
              <Keyboard className="w-4 h-4" />
              <span className="hidden sm:inline">Test</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="max-w-2xl mx-auto">
            <TestSettings
              settings={settings}
              onSettingsChange={setSettings}
              onStartTest={handleStartTest}
            />
          </TabsContent>

          <TabsContent value="test">
            <div className="text-center text-muted-foreground">
              Configure your test in the Setup tab and click Start
            </div>
          </TabsContent>

          <TabsContent value="history">
            <PerformanceHistory />
          </TabsContent>
        </Tabs>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why TypeMaster?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Keyboard className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Feedback</h3>
            <p className="text-muted-foreground">
              See your WPM and accuracy update live as you type
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-muted-foreground">
              Monitor your improvement with detailed performance history
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customizable</h3>
            <p className="text-muted-foreground">
              Choose duration, category, and difficulty level
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
