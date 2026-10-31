import { describe, it, expect } from 'vitest';
import { designTokens } from '../../data/designTokens';

describe('designTokens', () => {
	it('exposes all top-level categories', () => {
		expect(designTokens).toHaveProperty('colors');
		expect(designTokens).toHaveProperty('shadows');
		expect(designTokens).toHaveProperty('typography');
		expect(designTokens).toHaveProperty('spacing');
		expect(designTokens).toHaveProperty('borderRadius');
		expect(designTokens).toHaveProperty('transitions');
	});

	describe('colors', () => {
		it('brand and accent reference the same violet', () => {
			expect(designTokens.colors.brand).toBe(designTokens.colors.accent);
		});

		it('all hex color values start with #', () => {
			const hexValues = Object.values(designTokens.colors).filter(
				(v) => typeof v === 'string' && !v.startsWith('rgba'),
			);
			hexValues.forEach((v) => expect(v).toMatch(/^#[0-9a-fA-F]{3,8}$/));
		});

		it('page background is defined and non-empty', () => {
			expect(designTokens.colors.page).toBeTruthy();
		});
	});

	describe('spacing', () => {
		it('all spacing values end in rem', () => {
			Object.values(designTokens.spacing).forEach((v) => {
				expect(v).toMatch(/rem$/);
			});
		});

		it('values increase from xs to xxxl', () => {
			const { xs, sm, md, lg, xl, xxl, xxxl } = designTokens.spacing;
			const toNum = (v: string) => parseFloat(v);
			expect(toNum(xs)).toBeLessThan(toNum(sm));
			expect(toNum(sm)).toBeLessThan(toNum(md));
			expect(toNum(md)).toBeLessThan(toNum(lg));
			expect(toNum(xl)).toBeLessThan(toNum(xxl));
			expect(toNum(xxl)).toBeLessThan(toNum(xxxl));
		});
	});

	describe('transitions', () => {
		it('has fast, normal and slow durations', () => {
			expect(designTokens.transitions.fast).toBeTruthy();
			expect(designTokens.transitions.normal).toBeTruthy();
			expect(designTokens.transitions.slow).toBeTruthy();
		});
	});
});
