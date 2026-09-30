import { useState, useCallback, useId } from 'react';

const CONTACT_EMAIL = 'info@morningtidecc.com';

interface FormState {
	name: string;
	email: string;
	practice: string;
	service: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

function validate(f: FormState): FormErrors {
	const e: FormErrors = {};
	if (!f.name.trim()) e.name = 'Please enter your name.';
	if (!f.email.trim()) {
		e.email = 'Please enter your email address.';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
		e.email = 'Please enter a valid email address.';
	}
	if (!f.message.trim()) e.message = 'Please tell us how we can help.';
	return e;
}

const inputBase =
	'w-full rounded-2xl border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-0';

export default function ContactForm() {
	const uid = useId();
	const id = (field: string) => `${uid}-${field}`;

	const [form, setForm] = useState<FormState>({
		name: '',
		email: '',
		practice: '',
		service: '',
		message: '',
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [status, setStatus] = useState<Status>('idle');

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			const { name, value } = e.target;
			setForm(prev => ({ ...prev, [name]: value }));
			setErrors(prev => {
				if (prev[name as keyof FormErrors]) {
					const next = { ...prev };
					delete next[name as keyof FormErrors];
					return next;
				}
				return prev;
			});
		},
		[],
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const errs = validate(form);
			if (Object.keys(errs).length > 0) {
				setErrors(errs);
				return;
			}
			setStatus('submitting');
			try {
				const body = new FormData();
				(Object.entries(form) as [string, string][]).forEach(([k, v]) => body.set(k, v));
				const res = await fetch('/api/contact', { method: 'POST', body });
				setStatus(res.ok ? 'success' : 'error');
			} catch {
				setStatus('error');
			}
		},
		[form],
	);

	if (status === 'success') {
		return (
			<div className="flex flex-col items-center gap-4 rounded-3xl border border-line-soft bg-section-tint p-8 text-center">
				<span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-button-ink">
					<svg
						className="h-6 w-6"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="M20 6 9 17l-5-5" />
					</svg>
				</span>
				<h3 className="text-xl font-semibold text-ink">Message received!</h3>
				<p className="max-w-xs text-sm leading-6 text-muted">
					Thank you for reaching out. We typically reply within 1–2 business days.
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} noValidate className="space-y-4">
			{/* Name + Email */}
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label htmlFor={id('name')} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand">
						Name <span aria-hidden="true">*</span>
					</label>
					<input
						id={id('name')}
						name="name"
						type="text"
						autoComplete="name"
						value={form.name}
						onChange={handleChange}
						aria-required="true"
						aria-invalid={!!errors.name || undefined}
						aria-describedby={errors.name ? id('name-err') : undefined}
						className={`${inputBase} ${errors.name ? 'border-red-400' : 'border-line hover:border-brand'}`}
						placeholder="Dr. Jane Smith"
					/>
					{errors.name && (
						<p id={id('name-err')} role="alert" className="mt-1 text-xs text-red-500">
							{errors.name}
						</p>
					)}
				</div>

				<div>
					<label htmlFor={id('email')} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand">
						Email <span aria-hidden="true">*</span>
					</label>
					<input
						id={id('email')}
						name="email"
						type="email"
						autoComplete="email"
						value={form.email}
						onChange={handleChange}
						aria-required="true"
						aria-invalid={!!errors.email || undefined}
						aria-describedby={errors.email ? id('email-err') : undefined}
						className={`${inputBase} ${errors.email ? 'border-red-400' : 'border-line hover:border-brand'}`}
						placeholder="jane@yourpractice.com"
					/>
					{errors.email && (
						<p id={id('email-err')} role="alert" className="mt-1 text-xs text-red-500">
							{errors.email}
						</p>
					)}
				</div>
			</div>

			{/* Practice + Service */}
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label htmlFor={id('practice')} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand">
						Practice / Organization
					</label>
					<input
						id={id('practice')}
						name="practice"
						type="text"
						value={form.practice}
						onChange={handleChange}
						className={`${inputBase} border-line hover:border-brand`}
						placeholder="Solo practice, agency, etc."
					/>
				</div>

				<div>
					<label htmlFor={id('service')} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand">
						I'm interested in
					</label>
					<select
						id={id('service')}
						name="service"
						value={form.service}
						onChange={handleChange}
						className={`${inputBase} border-line hover:border-brand appearance-none`}
					>
						<option value="">Select a service…</option>
						<option value="consulting">Practice Consulting</option>
						<option value="ceu">CEU Training</option>
						<option value="both">Both</option>
						<option value="other">Something else</option>
					</select>
				</div>
			</div>

			{/* Message */}
			<div>
				<label htmlFor={id('message')} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand">
					How can we help? <span aria-hidden="true">*</span>
				</label>
				<textarea
					id={id('message')}
					name="message"
					rows={4}
					value={form.message}
					onChange={handleChange}
					aria-required="true"
					aria-invalid={!!errors.message || undefined}
					aria-describedby={errors.message ? id('message-err') : undefined}
					className={`${inputBase} resize-none ${errors.message ? 'border-red-400' : 'border-line hover:border-brand'}`}
					placeholder="Tell us about your practice and what you're working through — billing, credentialing, CEU training needs, etc."
				/>
				{errors.message && (
					<p id={id('message-err')} role="alert" className="mt-1 text-xs text-red-500">
						{errors.message}
					</p>
				)}
			</div>

			{status === 'error' && (
				<p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-800">
					Something went wrong. Please email us directly at{' '}
					<a href={`mailto:${CONTACT_EMAIL}`} className="underline">
						{CONTACT_EMAIL}
					</a>
					.
				</p>
			)}

			<button
				type="submit"
				disabled={status === 'submitting'}
				aria-busy={status === 'submitting'}
				className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-button-ink shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
			>
				{status === 'submitting' ? (
					<>
						<svg
							className="h-4 w-4 animate-spin"
							viewBox="0 0 24 24"
							fill="none"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
							<path
								fill="currentColor"
								className="opacity-75"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
							/>
						</svg>
						Sending…
					</>
				) : (
					'Send Inquiry'
				)}
			</button>
		</form>
	);
}
