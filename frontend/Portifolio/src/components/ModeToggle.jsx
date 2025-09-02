import React from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

const ModeToggle = ({ toggleDarkMode, darkMode }) => {
  return (
    <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
      {darkMode ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
      <span className="sr-only">Toggle Mode</span>
    </Button>
  );
};

export default ModeToggle;

