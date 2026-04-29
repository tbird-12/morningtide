import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'morningtide-theme';
const THEME_COLORS = {
	light: '#fdfcf9',
	dark: '#141716',
} as const;

function getInitialTheme(): 'light' | 'dark' {
	if (typeof window === 'undefined') return 'light';
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') return stored;
	} catch { /* noop */ }
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

	const apply = useCallback((t: 'light' | 'dark') => {
		const root = document.documentElement;
		root.dataset.theme = t;
		root.style.colorScheme = t;
		const themeMeta = document.querySelector('meta[name="theme-color"]');
		if (themeMeta instanceof HTMLMetaElement) {
			themeMeta.content = THEME_COLORS[t];
		}
		try { localStorage.setItem(STORAGE_KEY, t); } catch { /* noop */ }
	}, []);

	useEffect(() => {
		apply(theme);
	}, [theme, apply]);

	useEffect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = (e: MediaQueryListEvent) => {
			try { if (localStorage.getItem(STORAGE_KEY)) return; } catch { /* noop */ }
			const next = e.matches ? 'dark' : 'light';
			setTheme(next);
		};
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	}, []);

	const toggle = useCallback(() => {
		setTheme(prev => prev === 'dark' ? 'light' : 'dark');
	}, []);

	const isDark = theme === 'dark';

	return (
		<button
			type="button"
			onClick={toggle}
			className="theme-toggle group relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface p-0 text-muted shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-ink hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand)"
			aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			aria-pressed={isDark}
		>
			<svg
				className="h-4.5 w-4.5 transition-transform duration-500 ease-out"
				style={{ transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)' }}
				viewBox="0 0 24 24"
				fill="none"
				aria-hidden="true"
			>
				{/* Bulb body */}
				<path
					d="M8.5 14.5c-.9-.98-1.5-2.33-1.5-3.84A5 5 0 0 1 12 5.66a5 5 0 0 1 5 5c0 1.51-.6 2.86-1.5 3.84-.69.75-1.5 1.66-1.5 2.84h-4c0-1.18-.81-2.09-1.5-2.84Z"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinejoin="round"
				/>
				<path d="M9 18h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
				<path d="M10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
				{/* Filament */}
				<path
					className="transition-opacity duration-300"
					style={{ opacity: isDark ? 1 : 0 }}
					d="M10.45 11.1a1.55 1.55 0 1 1 3.1 0c0 .68-.31 1.08-.64 1.42-.36.37-.76.77-.9 1.42h-1.02c-.14-.65-.54-1.05-.9-1.42-.33-.34-.64-.74-.64-1.42Z"
					fill="currentColor"
				/>
				{/* Rays — visible in light mode */}
				<g
					className="transition-all duration-500"
					style={{ opacity: isDark ? 0 : 1, transform: isDark ? 'scale(0.5)' : 'scale(1)', transformOrigin: '12px 12px' }}
				>
					<path d="M12 2.75v1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
					<path d="m5.81 5.81 1.06 1.06" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
					<path d="M3 12h1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
					<path d="m17.13 6.87 1.06-1.06" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
					<path d="M19.5 12H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
				</g>
			</svg>
		</button>
	);
}
