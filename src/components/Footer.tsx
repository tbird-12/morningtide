import type { JSX } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import createLucideIcon from 'lucide-react/dist/esm/createLucideIcon.mjs';
import FadeIn from './FadeIn';
import { socialMedia, contactInfo, logoConfig, clinicalServicesUrl } from '../data/socialMedia';

const BrandX = createLucideIcon('brand-x', [
	['path', { d: 'M5 5l14 14', key: 'x-1' }],
	['path', { d: 'M19 5 9 15', key: 'x-2' }],
	['path', { d: 'M15 19l4-4', key: 'x-3' }],
	['path', { d: 'M5 19 13 11', key: 'x-4' }],
]);

const BrandLinkedin = createLucideIcon('brand-linkedin', [
	['rect', { x: '4', y: '4', width: '16', height: '16', rx: '3', key: 'li-1' }],
	['path', { d: 'M8 10v6', key: 'li-2' }],
	['path', { d: 'M12 16v-3a2 2 0 0 1 4 0v3', key: 'li-3' }],
	['path', { d: 'M12 10v6', key: 'li-4' }],
	['circle', { cx: '8', cy: '8', r: '1', key: 'li-5' }],
]);

const BrandFacebook = createLucideIcon('brand-facebook', [
	['path', { d: 'M18 2h-3a6 6 0 0 0 -6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2 -2h1z', key: 'fb-1' }],
]);

// Map platform names to icons
const iconMap: Record<string, typeof BrandX> = {
	twitter: BrandX,
	linkedin: BrandLinkedin,
	facebook: BrandFacebook,
};

const services = [
	{ label: 'Consulting', href: '/services/billing-and-credentialing-consultation' },
	{ label: 'CEU Trainings', href: '/services/ceu-trainings' },
	{ label: 'Pricing', href: '/pricing' },
];

const practice = [
	{ label: 'About Dr. Cornett', href: '/about' },
	{ label: 'FAQ', href: '/faq' },
	{ label: 'For Clinicians', href: '/services/ceu-trainings' },
];

const contact = [
	{ label: 'Email', href: `mailto:${contactInfo.email}`, icon: Mail },
	{ label: 'Phone', href: `tel:${contactInfo.phone}`, icon: Phone },
	{ label: 'Remote', href: '#', icon: MapPin, isStatic: true },
];

const year = new Date().getFullYear();

export default function Footer(): JSX.Element {
	return (
		<footer className="border-t border-line-soft bg-surface">
			<FadeIn threshold={0.1} duration={800}>
				<div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:px-10">
					{/* Logo / Branding Section */}
					<div className="flex items-start gap-8">
						<figure className="h-28 w-28 flex-shrink-0 overflow-hidden shadow-medium">
							<picture>
								<source
									media="(prefers-color-scheme: dark)"
									srcSet={logoConfig.darkMode}
								/>
								<img
									src={logoConfig.lightMode}
									alt={logoConfig.alt}
									className="h-full w-full object-cover"
									loading="lazy"
								/>
							</picture>
						</figure>
						<div className="space-y-4 pt-1">
							<h2 className="text-3xl font-bold leading-none text-ink">Morningtide Consulting and Collective</h2>
							<p className="max-w-md text-base leading-7 text-muted">
								Consulting and continuing education for mental health clinicians.
							</p>
						</div>
					</div>

					{/* Four-Column Navigation Grid */}
					<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
						{/* Services */}
						<nav aria-label="Services" className="space-y-3">
							<p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brand">
								Services
							</p>
							{services.map((link) => (
								<a
									key={link.href}
									className="block py-2 text-sm font-semibold text-muted transition-all duration-200 hover:translate-x-1 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
									href={link.href}
								>
									{link.label}
								</a>
							))}
						</nav>

						{/* Practice */}
						<nav aria-label="Practice" className="space-y-3">
							<p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brand">
								Practice
							</p>
							{practice.map((link) => (
								<a
									key={link.href}
									className="block py-2 text-sm font-semibold text-muted transition-all duration-200 hover:translate-x-1 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
									href={link.href}
								>
									{link.label}
								</a>
							))}
							<a
								className="inline-flex items-center gap-1 py-2 text-sm font-semibold text-accent underline underline-offset-4 transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
								href={clinicalServicesUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								Clinical Services
							</a>
						</nav>

						{/* Contact */}
						<nav aria-label="Contact" className="space-y-3">
							<p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brand">
								Contact
							</p>
							{contact.map(({ label, href, icon: Icon, isStatic }) => (
								<a
									key={label}
									className="flex items-center gap-2 py-2 text-sm font-semibold text-muted transition-all duration-200 hover:translate-x-1 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
									href={href}
									{...(isStatic ? { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault() } : {})}
									{...(href.startsWith('mailto') || href.startsWith('tel') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
								>
									<Icon className="h-4 w-4" aria-hidden="true" />
									<span>{label}</span>
								</a>
							))}
						</nav>

						{/* Social Media */}
						<div className="space-y-3">
							<p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brand">
								Follow
							</p>
							<div className="flex items-center gap-3">
								{socialMedia.map(({ label, href, platform }) => {
									const Icon = iconMap[platform];
									return (
										<a
											key={href}
											className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-soft bg-surface text-muted shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:text-ink hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
											href={href}
											aria-label={label}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Icon className="h-4 w-4" aria-hidden="true" />
										</a>
									);
								})}
							</div>
							<p className="text-xs leading-5 text-muted">
								{contactInfo.email}
							</p>
						</div>
					</div>
				</div>
			</FadeIn>

			{/* Copyright */}
			<div className="border-t border-line-soft">
				<p className="mx-auto max-w-6xl px-6 py-5 text-xs text-muted lg:px-10">
					© {year} Morningtide Consulting and Collective. All rights reserved.
				</p>
			</div>
		</footer>
	);
}

