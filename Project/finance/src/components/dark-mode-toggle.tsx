'use client';

import Button from './button';
import { Moon, Sun } from 'lucide-react';
import useDarkMode from '@/hooks/useDarkMode';

export default function DarkModeToggle({ defaultMode = 'dark' }) {
  const { theme, toggleTheme } = useDarkMode(defaultMode);
  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === 'light' && <Moon className="w-6 h-6" />}
      {theme === 'dark' && <Sun className="w-6 h-6" />}
    </Button>
  );
}
