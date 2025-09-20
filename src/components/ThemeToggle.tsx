'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';

const THEME_ORDER: Theme[] = ['light', 'dark', 'auto'];
const STORAGE_KEY = 'theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('auto');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    const isDark = newTheme === 'dark' ||
      (newTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    const savedTheme = (localStorage.getItem(STORAGE_KEY) as Theme) || 'auto';
    setTheme(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);
  }, [applyTheme]);

  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('auto');

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, applyTheme]);

  const toggleTheme = useCallback(() => {
    const currentIndex = THEME_ORDER.indexOf(theme);
    const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];

    setTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }, [theme, applyTheme]);

  const icon = useMemo(() => {
    if (theme === 'light') return 'i-ri-sun-line';
    if (theme === 'dark') return 'i-ri-moon-line';
    return 'i-ri-computer-line'; // auto mode shows computer icon
  }, [theme]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="nav-link" aria-label="Toggle theme" disabled>
        <span className="i-ri-computer-line opacity-50" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="nav-link"
      aria-label={`Current theme: ${theme}. Click to cycle through themes.`}
    >
      <span className={icon} />
    </button>
  );
}