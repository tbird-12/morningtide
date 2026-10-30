import { useState, useEffect, useRef, useCallback } from 'react';
import { Mail } from 'lucide-react';
import { contactInfo } from '../data';
import logoLight from '../assets/logo-light.jpg';

interface NavItem {
	label: string;
	href: string;
}

const navigation: NavItem[] = [
	{ label: 'Consulting', href: '/consulting' },
	{ label: 'Education', href: '/services/ceu-trainings' },
	{ label: 'FAQ & Pricing', href: '/faq' },
	{ label: 'Meet Heather', href: '/about' },
];

const leftNavigation = navigation.slice(0, 2);
const rightNavigation = navigation.slice(2);

const isActivePath = (currentPath: string, href: string) =>
	currentPath === href || (href !== '/' && currentPath.startsWith(`${href}/`));

function MobileNav({ currentPath, open, onClose }: { currentPath: string; open: boolean; onClose: () => void }) {
	const panelRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	useEffect(() => {
		if (open) {
			triggerRef.current = document.activeElement as HTMLButtonElement;
			const firstFocusable = panelRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])');
			firstFocusable?.focus();
		} else if (triggerRef.current) {
			triggerRef.current.focus();
		}
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
				return;
			}

			if (e.key === 'Tab' && panelRef.current) {
				const focusable = Array.from(
					panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
				).filter((el) => el.offsetParent !== null);
				if (focusable.length === 0) return;
				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [open, onClose]);

	return (
		<>
			<div
				className="fixed inset-0 z-40 backdrop-blur-md md:hidden"
				style={{
					background: 'linear-gradient(180deg, rgba(7, 8, 13, 0.74) 0%, rgba(7, 8, 13, 0.9) 100%)',
					opacity: open ? 1 : 0,
					pointerEvents: open ? 'auto' : 'none',
					transition: 'opacity 320ms cubic-bezier(0.16,1,0.3,1)',
				}}
				onClick={onClose}
				aria-hidden="true"
			/>

			<div
				id="mobile-navigation"
				ref={panelRef}
				role="dialog"
				aria-label="Navigation menu"
				aria-modal="true"
				className="fixed right-3 bottom-3 left-3 z-50 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d15]/95 ring-1 ring-inset ring-white/10 backdrop-blur-2xl md:hidden"
				style={{
					top: 'calc(var(--header-height-mobile) + env(safe-area-inset-top, 0px) + 0.5rem)',
					opacity: open ? 1 : 0,
					transform: open ? 'translateY(0) scale(1)' : 'translateY(-16px) scale(0.985)',
					pointerEvents: open ? 'auto' : 'none',
					transition: 'opacity 320ms cubic-bezier(0.16,1,0.3,1), transform 320ms cubic-bezier(0.16,1,0.3,1)',
					boxShadow: open ? '0 34px 82px rgba(12, 10, 24, 0.65)' : 'none',
				}}
				aria-hidden={!open}
			>
				<div className="flex h-full flex-col">
					<div className="border-b border-white/10 px-5 pt-5 pb-4">
						<p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-brand/80">Navigation</p>
						<p className="mt-2 text-lg font-semibold text-ink">Explore Morningtide</p>
					</div>

					<div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
						{navigation.map((item) => (
							<a
								key={item.href}
								className={`flex min-h-12 items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold shadow-soft transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
									isActivePath(currentPath, item.href)
										? 'border-brand/35 bg-white/[0.05] text-ink'
										: 'border-white/10 bg-white/[0.02] text-muted hover:border-white/20 hover:text-ink'
								}`}
								href={item.href}
								onClick={onClose}
								aria-current={isActivePath(currentPath, item.href) ? 'page' : undefined}
							>
								<span>{item.label}</span>
								<span aria-hidden="true" className="text-base text-brand/75">
									→
								</span>
							</a>
						))}
					</div>

					<div className="space-y-3 border-t border-white/10 px-4 pt-4 pb-5">
						<a
							className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-button-ink shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
							href="/#contact"
							onClick={onClose}
						>
							Book a Consultation
						</a>

						<a
							className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-line-soft bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
							href={`mailto:${contactInfo.email}`}
							onClick={onClose}
						>
							<Mail className="h-4 w-4" aria-hidden="true" />
							{contactInfo.email}
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default function Header({ currentPath }: { currentPath: string }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const closeMobile = useCallback(() => setMobileOpen(false), []);

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-[60] border-b border-line-soft bg-header-bg backdrop-blur-xl md:sticky">
				<div className="mx-auto hidden max-w-7xl px-4 py-4 md:block md:px-6 lg:px-8">
					<div className="rounded-full border border-white/10 bg-[#0d0d13]/80 p-2 shadow-[0_20px_80px_rgba(138,92,246,0.22)] ring-1 ring-inset ring-white/5 backdrop-blur-2xl">
						<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
							<nav aria-label="Primary" className="flex items-center justify-start gap-2.5 pl-2">
								{leftNavigation.map((item) => (
									<a
										key={item.href}
										className={`inline-flex min-h-11 items-center rounded-full border border-transparent px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all duration-200 hover:border-white/10 hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${isActivePath(currentPath, item.href) ? 'border-white/10 bg-white/[0.04] text-ink' : 'text-muted'}`}
										href={item.href}
										aria-current={isActivePath(currentPath, item.href) ? 'page' : undefined}
									>
										{item.label}
									</a>
								))}
							</nav>

							<a
								className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#121218] p-2 shadow-[0_0_35px_rgba(167,139,250,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(167,139,250,0.45)]"
								href="/"
								aria-label="Morningtide Consulting and Collective home"
							>
								<span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(167,139,250,0.45),_rgba(167,139,250,0.12)_32%,_transparent_70%)] opacity-90 group-hover:opacity-100" />
								<figure className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-black/20">
									<img
										src={logoLight.src}
										alt="Morningtide Consulting and Collective Logo"
										className="h-full w-full object-cover"
										loading="eager"
										fetchPriority="high"
									/>
								</figure>
							</a>

							<nav aria-label="Secondary" className="flex items-center justify-end gap-2.5 pr-2">
								{rightNavigation.map((item) => (
									<a
										key={item.href}
										className={`inline-flex min-h-11 items-center rounded-full border border-transparent px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all duration-200 hover:border-white/10 hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${isActivePath(currentPath, item.href) ? 'border-white/10 bg-white/[0.04] text-ink' : 'text-muted'}`}
										href={item.href}
										aria-current={isActivePath(currentPath, item.href) ? 'page' : undefined}
									>
										{item.label}
									</a>
								))}
								<a
									className="inline-flex min-h-11 items-center rounded-full bg-[linear-gradient(135deg,#a78bfa_0%,#d8b4fe_100%)] px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#120f1d] shadow-[0_12px_30px_rgba(167,139,250,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(167,139,250,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
									href="/#contact"
								>
									Book a Consultation
								</a>
							</nav>
						</div>
					</div>
				</div>

				<div className="md:hidden">
					<div className="flex h-[calc(var(--header-height-mobile)+env(safe-area-inset-top,0px))] items-end px-3 pb-2">
						<div className="flex h-[calc(var(--header-height-mobile)-0.5rem)] w-full items-center justify-between rounded-3xl border border-white/10 bg-[#0d1019]/90 px-3 shadow-[0_18px_45px_rgba(11,8,24,0.45)] ring-1 ring-inset ring-white/10 backdrop-blur-2xl">
							<a
								className="group flex min-w-0 items-center gap-3"
								href="/"
								aria-label="Morningtide Consulting and Collective home"
							>
								<figure className="h-11 w-11 overflow-hidden rounded-2xl border border-white/15 shadow-soft">
									<img
										src={logoLight.src}
										alt="Morningtide Consulting and Collective Logo"
										className="h-full w-full object-cover"
										loading="eager"
										fetchPriority="high"
									/>
								</figure>
								<div className="min-w-0">
									<p className="text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-brand">Morningtide</p>
									<p className="truncate text-sm font-semibold text-ink">&amp; Collective</p>
								</div>
							</a>

							<div>
								<button
									type="button"
									className="inline-flex min-h-11 min-w-[5.25rem] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
									aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
									aria-expanded={mobileOpen}
									aria-controls="mobile-navigation"
									onClick={() => setMobileOpen((prev) => !prev)}
								>
									<span className="relative h-4 w-4">
										<span
											className={`absolute top-[2px] left-0 h-[2px] w-4 rounded-full bg-current transition-all duration-300 ${mobileOpen ? 'translate-y-[5px] rotate-45' : ''}`}
										/>
										<span
											className={`absolute top-[7px] left-0 h-[2px] w-4 rounded-full bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
										/>
										<span
											className={`absolute top-[12px] left-0 h-[2px] w-4 rounded-full bg-current transition-all duration-300 ${mobileOpen ? '-translate-y-[5px] -rotate-45' : ''}`}
										/>
									</span>
									Menu
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>

			<MobileNav currentPath={currentPath} open={mobileOpen} onClose={closeMobile} />
		</>
	);
}
