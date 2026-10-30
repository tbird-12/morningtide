/**
 * Design Tokens: Standardized CSS values and design system configuration
 * Midnight Iris — Dark Premium Design System
 */

export const designTokens = {
	// Color System - Midnight Iris Palette
	colors: {
		// Primary Background - Near Black
		page: '#09090b',
		// Secondary Surface - Dark Zinc
		surface: '#18181b',
		surfaceStrong: '#27272a',
		// Primary Action - Violet
		brand: '#a78bfa',
		brandSoft: 'rgba(167, 139, 250, 0.1)',
		// Accent - Violet (same as brand)
		accent: '#a78bfa',
		accentSoft: 'rgba(167, 139, 250, 0.06)',
		accentText: '#c4b5fd',
		// Typography
		ink: '#fafafa',
		muted: '#a1a1aa',
		line: '#3f3f46',
		lineSoft: 'rgba(250, 250, 250, 0.06)',
		headerBg: 'rgba(9, 9, 11, 0.85)',
		buttonInk: '#09090b',
		sectionTint: '#141417',
		overlay: 'rgba(0, 0, 0, 0.7)',
	},

	// Shadows
	shadows: {
		soft: '0 2px 20px rgba(0, 0, 0, 0.4)',
		medium: '0 12px 60px rgba(0, 0, 0, 0.6)',
		brand: '0 8px 32px rgba(167, 139, 250, 0.25)',
	},

	// Typography
	typography: {
		fontBody: "'Inter', 'Manrope', sans-serif",
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
