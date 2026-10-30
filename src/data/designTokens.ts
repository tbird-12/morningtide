/**
 * Design Tokens: Standardized CSS values and design system configuration
 * Clinical Provider Portal — Single unified theme
 */

export const designTokens = {
	// Color System - Clinical Provider Palette
	colors: {
		// Primary Background - Warm Cream
		page: '#f5f1eb',
		// Secondary Surface - Soft Sage
		surface: '#b8c9b8',
		surfaceStrong: '#a8b89c',
		// Primary Action - Warm Terracotta
		brand: '#c97a5c',
		brandSoft: '#e8d4c8',
		// Accent - Blush Sand
		accent: '#d9c9bd',
		accentSoft: '#ede8e3',
		accentText: '#8b7355',
		// Typography - Deep Charcoal
		ink: '#3e3e3e',
		muted: '#6b6b6b',
		line: '#d9c9bd',
		lineSoft: 'rgba(62, 62, 62, 0.08)',
		headerBg: 'rgba(245, 241, 235, 0.95)',
		buttonInk: '#ffffff',
		sectionTint: '#ede8e3',
		overlay: 'rgba(62, 62, 62, 0.12)',
		// Status Colors
		success: '#a8b89c',
		warning: '#e8b4a0',
		error: '#d99b94',
	},

	// Shadows
	shadows: {
		soft: '0 2px 15px rgba(0, 0, 0, 0.04)',
		medium: '0 10px 40px rgba(62, 62, 62, 0.08)',
		brand: '0 12px 30px rgba(201, 122, 92, 0.12)',
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
