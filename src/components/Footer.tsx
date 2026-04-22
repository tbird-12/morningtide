import FadeIn from './FadeIn';

const services = [
	{ label: 'Psychological Evaluations', href: '/services/psychological-evaluations' },
	{ label: 'Psychoeducational Testing', href: '/services/psychoeducational-testing' },
	{ label: 'Clinician Consultations', href: '/services/billing-and-credentialing-consultation' },
	{ label: 'CEU Trainings', href: '/services/ceu-trainings' },
	{ label: 'Investment', href: '/services/investment' },
];

const practice = [
	{ label: 'About Dr. Cornett', href: '/about-clinician' },
	{ label: 'FAQ', href: '/faq' },
	{ label: 'Locations', href: '/locations' },
	{ label: 'All Services', href: '/services' },
	{ label: 'Contact / Inquire', href: '/#contact' },
];

const year = new Date().getFullYear();

export default function Footer() {
	return (
		<footer class="border-t border-(--color-line-soft) bg-(--color-surface)">
			<FadeIn threshold={0.1} duration={800}>
				<div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:px-10">
					<div className="space-y-4">
						<p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-(--color-brand)">
							Morning Tide Consulting and Collective
						</p>
						<h2 class="text-3xl leading-none text-(--color-ink)">
							Evaluation, consultation, and education — all under one practice.
						</h2>
						<p className="max-w-md text-base leading-7 text-(--color-muted)">
							Comprehensive psychological and psychoeducational evaluations for clients who value depth, clarity, and timely results.
						</p>
					</div>

					<nav aria-label="Services" className="space-y-3">
						<p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-(--color-brand)">Services</p>
						{services.map(link => (
							<a
								key={link.href}
								className="block text-sm font-semibold text-(--color-muted) transition-all duration-200 hover:text-(--color-ink) hover:translate-x-1"
								href={link.href}
							>
								{link.label}
							</a>
						))}
					</nav>

					<nav aria-label="Practice" className="space-y-3">
						<p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-(--color-brand)">Practice</p>
						{practice.map(link => (
							<a
								key={link.href}
								className="block text-sm font-semibold text-(--color-muted) transition-all duration-200 hover:text-(--color-ink) hover:translate-x-1"
								href={link.href}
							>
								{link.label}
							</a>
						))}
					</nav>
				</div>
			</FadeIn>
			<div className="border-t border-(--color-line-soft)">
				<p className="mx-auto max-w-6xl px-6 py-5 text-xs text-(--color-muted) lg:px-10">
					© {year} Morning Tide Consulting and Collective. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
