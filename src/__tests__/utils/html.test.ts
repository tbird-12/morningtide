import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../../utils/html';

describe('escapeHtml', () => {
	it('escapes ampersands', () => {
		expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
	});

	it('escapes less-than and greater-than', () => {
		expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
	});

	it('escapes double quotes', () => {
		expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;');
	});

	it("escapes single quotes", () => {
		expect(escapeHtml("it's")).toBe('it&#39;s');
	});

	it('handles an empty string', () => {
		expect(escapeHtml('')).toBe('');
	});

	it('leaves safe strings unchanged', () => {
		expect(escapeHtml('Hello world')).toBe('Hello world');
	});

	it('neutralises a classic XSS payload', () => {
		const xss = '<img src=x onerror="alert(1)">';
		const escaped = escapeHtml(xss);
		expect(escaped).not.toContain('<');
		expect(escaped).not.toContain('>');
		expect(escaped).not.toContain('"');
	});

	it('escapes all special chars in a combined string', () => {
		expect(escapeHtml('a & b < c > d "e" \'f\'')).toBe(
			'a &amp; b &lt; c &gt; d &quot;e&quot; &#39;f&#39;',
		);
	});
});
