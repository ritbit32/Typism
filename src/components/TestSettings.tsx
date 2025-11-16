import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TestSettings as TestSettingsType } from '@/types/typing';
import { categories } from '@/data/textPassages';
import { Settings, Play } from 'lucide-react';

interface TestSettingsProps {
  settings: TestSettingsType;
  onSettingsChange: (settings: TestSettingsType) => void;
  onStartTest: () => void;
}

const TestSettings = ({ settings, onSettingsChange, onStartTest }: TestSettingsProps) => {
  const durations = [
    { value: 60, label: '1 Minute' },
    { value: 180, label: '3 Minutes' },
    { value: 300, label: '5 Minutes' }
  ];

  return (
    <Card className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Test Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="duration" className="text-base mb-2 block">
            Test Duration
          </Label>
          <Select
            value={settings.duration.toString()}
            onValueChange={(value) =>
              onSettingsChange({ ...settings, duration: parseInt(value) as 60 | 180 | 300 })
            }
          >
            <SelectTrigger id="duration" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {durations.map((duration) => (
                <SelectItem key={duration.value} value={duration.value.toString()}>
                  {duration.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category" className="text-base mb-2 block">
            Text Category
          </Label>
          <Select
            value={settings.category}
            onValueChange={(value) => onSettingsChange({ ...settings, category: value })}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="language" className="text-base mb-2 block">
            Language
          </Label>
          <Select
            value={settings.language}
            onValueChange={(value) => onSettingsChange({ ...settings, language: value })}
          >
            <SelectTrigger id="language" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish (Coming Soon)</SelectItem>
              <SelectItem value="French">French (Coming Soon)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={onStartTest}
          size="lg"
          className="w-full gradient-primary text-lg gap-2 hover:scale-105 transition-transform"
        >
          <Play className="w-5 h-5" />
          Start Typing Test
        </Button>
      </div>
    </Card>
  );
};

export default TestSettings;
