import { describe, it, expect } from 'vitest';
import { socialMedia, contactInfo, logoConfig, clinicalServicesUrl } from '../../data/socialMedia';

describe('socialMedia', () => {
	it('contains at least one social link', () => {
		expect(socialMedia.length).toBeGreaterThan(0);
	});

	it('all hrefs start with https://', () => {
		socialMedia.forEach((link) => {
			expect(link.href).toMatch(/^https:\/\//);
		});
	});

	it('all links have non-empty label and ariaLabel', () => {
		socialMedia.forEach((link) => {
			expect(link.label).toBeTruthy();
			expect(link.ariaLabel).toBeTruthy();
		});
	});

	it('platforms are valid values', () => {
		const validPlatforms = ['twitter', 'linkedin', 'facebook', 'instagram'];
		socialMedia.forEach((link) => {
			expect(validPlatforms).toContain(link.platform);
		});
	});
});

describe('contactInfo', () => {
	it('uses the canonical morningtidecc.com email', () => {
		expect(contactInfo.email).toBe('info@morningtidecc.com');
	});

	it('email does not reference the wrong domain', () => {
		expect(contactInfo.email).not.toContain('morningtideconsulting.com');
	});

	it('phone is in E.164 format', () => {
		expect(contactInfo.phone).toMatch(/^\+1\d{10}$/);
	});

	it('phoneDisplay includes country code', () => {
		expect(contactInfo.phoneDisplay).toContain('+1');
	});

	it('location is defined', () => {
		expect(contactInfo.location).toBeTruthy();
	});
});

describe('logoConfig', () => {
	it('has a non-empty alt text', () => {
		expect(logoConfig.alt).toBeTruthy();
	});

	it('src references a jpg or png', () => {
		expect(logoConfig.src).toMatch(/\.(jpg|jpeg|png|webp|svg)$/i);
	});
});

describe('clinicalServicesUrl', () => {
	it('is an https URL', () => {
		expect(clinicalServicesUrl).toMatch(/^https:\/\//);
	});
});
