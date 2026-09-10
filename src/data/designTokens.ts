/**
 * Design Tokens: Standardized CSS values and design system configuration
 */

export const designTokens = {
	// Color System
	colors: {
		light: {
			page: '#fdfcf9',
			surface: '#ffffff',
			surfaceStrong: '#f4f3ee',
			brand: '#a3957d',
			brandSoft: '#ede8df',
			accent: '#7a8d83',
			accentSoft: '#eef2f0',
			ink: '#2d3230',
			muted: '#6b7571',
			line: '#e8e5dd',
			lineSoft: 'rgba(45, 50, 48, 0.05)',
			headerBg: 'rgba(253, 252, 249, 0.8)',
			buttonInk: '#ffffff',
			sectionTint: '#f7f6f2',
			overlay: 'rgba(28, 32, 30, 0.18)',
		},
		dark: {
			page: '#141716',
			surface: '#1c211f',
			surfaceStrong: '#252b29',
			brand: '#c5b9a5',
			brandSoft: '#3a342a',
			accent: '#9eb1a8',
			accentSoft: '#28332f',
			ink: '#f1f3f2',
			muted: '#96a19c',
			line: '#2a312e',
			lineSoft: 'rgba(241, 243, 242, 0.06)',
			headerBg: 'rgba(20, 23, 22, 0.8)',
			buttonInk: '#141716',
			sectionTint: '#1e2421',
			overlay: 'rgba(5, 8, 7, 0.56)',
		},
	},

	// Shadows
	shadows: {
		soft: '0 2px 15px rgba(0, 0, 0, 0.02)',
		medium: '0 10px 40px rgba(58, 63, 60, 0.05)',
		brand: '0 12px 30px rgba(163, 149, 125, 0.1)',
	},

	// Typography
	typography: {
		fontBody: "'Manrope', sans-serif",
		fontDisplay: "'Cormorant Garamond', serif",
	},

	// Spacing
	spacing: {
		xs: '0.25rem',
		sm: '0.5rem',
		md: '1rem',
		lg: '1.5rem',
		xl: '2rem',
		xxl: '3rem',
		xxxl: '4rem',
	},

	// Border Radius
	borderRadius: {
		sm: '0.375rem',
		md: '0.5rem',
		lg: '0.75rem',
		xl: '1rem',
		full: '9999px',
	},

	// Header Heights
	headerHeights: {
		mobile: '4.5rem',
		desktop: '5.5rem',
	},

	// Transitions
	transitions: {
		fast: '300ms ease',
		normal: '400ms ease',
		slow: '500ms ease',
		easing: {
			easeOut: 'cubic-bezier(0.16,1,0.3,1)',
		},
	},
};

export type DesignTokens = typeof designTokens;
