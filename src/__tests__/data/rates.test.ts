import { describe, it, expect } from 'vitest';
import { rates } from '../../data/rates';

describe('rates', () => {
	it('exposes consultation, hourly, packages, and ceuTrainings', () => {
		expect(rates).toHaveProperty('consultation');
		expect(rates).toHaveProperty('hourly');
		expect(rates).toHaveProperty('packages');
		expect(rates).toHaveProperty('ceuTrainings');
	});

	describe('consultation', () => {
		it('has a positive price', () => {
			expect(rates.consultation.price).toBeGreaterThan(0);
		});

		it('uses USD currency', () => {
			expect(rates.consultation.currency).toBe('USD');
		});
	});

	describe('packages', () => {
		const pkgs = ['starter', 'professional', 'enterprise'] as const;

		it.each(pkgs)('%s has positive price and sessions', (key) => {
			const pkg = rates.packages[key];
			expect(pkg.price).toBeGreaterThan(0);
			expect(pkg.sessions).toBeGreaterThan(0);
		});

		it('packages are ordered by ascending price', () => {
			const { starter, professional, enterprise } = rates.packages;
			expect(starter.price).toBeLessThan(professional.price);
			expect(professional.price).toBeLessThan(enterprise.price);
		});

		it('enterprise has the most sessions', () => {
			const { starter, professional, enterprise } = rates.packages;
			expect(enterprise.sessions).toBeGreaterThan(professional.sessions);
			expect(professional.sessions).toBeGreaterThan(starter.sessions);
		});

		it.each(pkgs)('%s savings string mentions a percent', (key) => {
			expect(rates.packages[key].savings).toMatch(/%/);
		});
	});

	describe('ceuTrainings', () => {
		it('pricePerHour is positive', () => {
			expect(rates.ceuTrainings.pricePerHour).toBeGreaterThan(0);
		});

		it('minHours is less than maxHours', () => {
			expect(rates.ceuTrainings.minHours).toBeLessThan(rates.ceuTrainings.maxHours);
		});
	});
});
