'use client';

import { MoonStarIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@zx/ui/components/button';

export function ThemeToggle({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if (theme === 'dark') {
      return setTheme('light');
    }
    return setTheme('dark');
  };

  return (
    <Button onClick={handleClick} size={'icon'} variant={'ghost'} {...props} className={className}>
      <MoonStarIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
