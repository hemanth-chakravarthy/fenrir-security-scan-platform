import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/index.js';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();
    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-dark-surface transition-all duration-150"
        >
            {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
            ) : (
                <Moon className="w-4 h-4 text-neutral-600" />
            )}
        </button>
    );
}
