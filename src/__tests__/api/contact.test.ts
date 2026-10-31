import { describe, it, expect, vi, beforeEach } from 'vitest';

// Dynamically import the contact module so we can stub env before each test
const loadContact = () => import('../../pages/api/contact');

function makeRequest(fields: Record<string, string>): Request {
	const body = new FormData();
	Object.entries(fields).forEach(([k, v]) => body.append(k, v));
	return new Request('http://localhost/api/contact', { method: 'POST', body });
}

describe('GET /api/contact', () => {
	it('returns 200 with ok:true', async () => {
		const { GET } = await loadContact();
		const res = await GET({ request: new Request('http://localhost/api/contact') } as never);
		expect(res.status).toBe(200);
		const body = await res.json();
		expect(body.ok).toBe(true);
	});
});

describe('POST /api/contact — validation', () => {
	beforeEach(() => {
		vi.unstubAllEnvs();
		vi.stubEnv('RESEND_API_KEY', '');
		vi.resetModules();
	});

	it('returns 400 when name is missing', async () => {
		const { POST } = await loadContact();
		const res = await POST({
			request: makeRequest({ email: 'a@b.com', message: 'Hello' }),
		} as never);
		expect(res.status).toBe(400);
		const body = await res.json();
		expect(body.error).toMatch(/required/i);
	});

	it('returns 400 when email is missing', async () => {
		const { POST } = await loadContact();
		const res = await POST({
			request: makeRequest({ name: 'Alice', message: 'Hello' }),
		} as never);
		expect(res.status).toBe(400);
	});

	it('returns 400 when message is missing', async () => {
		const { POST } = await loadContact();
		const res = await POST({
			request: makeRequest({ name: 'Alice', email: 'a@b.com' }),
		} as never);
		expect(res.status).toBe(400);
	});

	it('returns 400 for an invalid email address', async () => {
		const { POST } = await loadContact();
		const res = await POST({
			request: makeRequest({ name: 'Alice', email: 'not-an-email', message: 'Hello' }),
		} as never);
		expect(res.status).toBe(400);
		const body = await res.json();
		expect(body.error).toMatch(/invalid email/i);
	});

	it('returns success when all required fields are valid and no API key is configured', async () => {
		const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
		const { POST } = await loadContact();
		const res = await POST({
			request: makeRequest({
				name: 'Alice',
				email: 'alice@example.com',
				message: 'I would like to learn more.',
			}),
		} as never);
		expect(res.status).toBe(200);
		const body = await res.json();
		expect(body.success).toBe(true);
		consoleSpy.mockRestore();
	});

	it('accepts optional practice and service fields', async () => {
		const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
		const { POST } = await loadContact();
		const res = await POST({
			request: makeRequest({
				name: 'Bob',
				email: 'bob@example.com',
				message: 'Interested in CEU.',
				practice: 'Bob Therapy LLC',
				service: 'ceu',
			}),
		} as never);
		expect(res.status).toBe(200);
		consoleSpy.mockRestore();
	});

	it('does not fail when name contains HTML special characters', async () => {
		const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
		const { POST } = await loadContact();
		const res = await POST({
			request: makeRequest({
				name: '<script>alert(1)</script>',
				email: 'xss@example.com',
				message: 'Test message',
			}),
		} as never);
		// Should succeed (escaping happens server-side, not reject the request)
		expect(res.status).toBe(200);
		consoleSpy.mockRestore();
	});
});
