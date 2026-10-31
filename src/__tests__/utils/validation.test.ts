import { describe, it, expect } from 'vitest';
import { EMAIL_REGEX, isValidEmail } from '../../utils/validation';

describe('EMAIL_REGEX', () => {
	it('matches a standard email', () => {
		expect(EMAIL_REGEX.test('user@example.com')).toBe(true);
	});

	it('matches subdomains', () => {
		expect(EMAIL_REGEX.test('user@mail.example.co.uk')).toBe(true);
	});

	it('rejects an address without @', () => {
		expect(EMAIL_REGEX.test('notanemail.com')).toBe(false);
	});

	it('rejects an address without a domain', () => {
		expect(EMAIL_REGEX.test('user@')).toBe(false);
	});

	it('rejects an address with spaces', () => {
		expect(EMAIL_REGEX.test('user name@example.com')).toBe(false);
	});

	it('rejects an empty string', () => {
		expect(EMAIL_REGEX.test('')).toBe(false);
	});
});

describe('isValidEmail', () => {
	it('returns true for a valid email', () => {
		expect(isValidEmail('info@morningtidecc.com')).toBe(true);
	});

	it('returns false for an invalid email', () => {
		expect(isValidEmail('bad-email')).toBe(false);
	});
});
