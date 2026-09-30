import type { APIRoute } from 'astro';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
	const json = (body: object, status = 200) =>
		new Response(JSON.stringify(body), {
			status,
			headers: { 'Content-Type': 'application/json' },
		});

	try {
		const data = await request.formData();
		const name = data.get('name')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';
		const practice = data.get('practice')?.toString().trim() ?? '';
		const service = data.get('service')?.toString().trim() ?? '';
		const message = data.get('message')?.toString().trim() ?? '';

		if (!name || !email || !message) {
			return json({ error: 'Required fields missing.' }, 400);
		}
		if (!EMAIL_REGEX.test(email)) {
			return json({ error: 'Invalid email address.' }, 400);
		}

		const apiKey = import.meta.env.RESEND_API_KEY;
		const toEmail = import.meta.env.CONTACT_TO_EMAIL ?? 'info@morningtidecc.com';

		if (!apiKey) {
			// Dev fallback: log and succeed so the UI works without Resend configured
			console.log('[contact] no RESEND_API_KEY — would have sent:', { name, email, service, message });
			return json({ success: true });
		}

		const serviceLabel: Record<string, string> = {
			consulting: 'Practice Consulting',
			ceu: 'CEU Training',
			both: 'Consulting & CEU Training',
			other: 'Other',
		};

		const html = `
<div style="font-family:sans-serif;max-width:600px;color:#2d3230">
  <h2 style="color:#a3957d;margin-bottom:8px">New Inquiry — Morningtide MCC</h2>
  <hr style="border:none;border-top:1px solid #e8e5dd;margin-bottom:24px"/>
  <table style="border-collapse:collapse;width:100%">
    <tr><td style="padding:8px 0;color:#6b7571;font-size:13px;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
    <tr><td style="padding:8px 0;color:#6b7571;font-size:13px">Reply-to</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
    ${practice ? `<tr><td style="padding:8px 0;color:#6b7571;font-size:13px">Practice</td><td style="padding:8px 0">${practice}</td></tr>` : ''}
    ${service ? `<tr><td style="padding:8px 0;color:#6b7571;font-size:13px">Interested in</td><td style="padding:8px 0">${serviceLabel[service] ?? service}</td></tr>` : ''}
  </table>
  <hr style="border:none;border-top:1px solid #e8e5dd;margin:16px 0"/>
  <p style="white-space:pre-wrap;line-height:1.6">${message}</p>
</div>`.trim();

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'Morningtide Contact Form <noreply@morningtidecc.com>',
				to: toEmail,
				reply_to: email,
				subject: `New inquiry from ${name}${service ? ` — ${serviceLabel[service] ?? service}` : ''}`,
				html,
			}),
		});

		if (!res.ok) {
			const err = await res.text();
			console.error('[contact] Resend error:', err);
			return json({ error: 'Email delivery failed. Please try again.' }, 502);
		}

		return json({ success: true });
	} catch (err) {
		console.error('[contact] Unexpected error:', err);
		return json({ error: 'Server error. Please try again.' }, 500);
	}
};
