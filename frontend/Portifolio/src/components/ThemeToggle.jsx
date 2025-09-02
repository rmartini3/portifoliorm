import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

function ThemeToggle({ toggleTheme }) {
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Palette className="h-6 w-6" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}

export default ThemeToggle;