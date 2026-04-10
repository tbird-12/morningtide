import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import ThemeToggle from './ThemeToggle';

interface NavChild {
	label: string;
	href: string;
}

interface NavItem {
	label: string;
	href: string;
	children?: NavChild[];
}

const navigation: NavItem[] = [
	{
		label: 'About',
		href: '/about-clinician',
		children: [
			{ label: 'Clinician', href: '/about-clinician' },
			{ label: 'FAQ', href: '/faq' },
			{ label: 'Investment', href: '/services/investment' },
			{ label: 'Locations', href: '/locations' },
		],
	},
	{
		label: 'Evaluations',
		href: '/services',
		children: [
			{ label: 'Psychological Evaluations', href: '/services/psychological-evaluations' },
			{ label: 'Psychoeducational Evaluations', href: '/services/psychoeducational-testing' },
		],
	},
	{ label: 'Consultations', href: '/services/billing-and-credentialing-consultation' },
	{ label: 'Education', href: '/services/ceu-trainings' },
];

const mobileVisibleNav = navigation.slice(0, 2);
const mobileMoreNav = navigation.slice(2);

/* ─── Desktop Dropdown ─── */
function DesktopDropdown({ item }: { item: NavItem }) {
	const [open, setOpen] = useState(false);
	const timeout = useRef<ReturnType<typeof setTimeout>>();
	const ref = useRef<HTMLDivElement>(null);

	const enter = useCallback(() => {
		clearTimeout(timeout.current);
		setOpen(true);
	}, []);
	const leave = useCallback(() => {
		timeout.current = setTimeout(() => setOpen(false), 180);
	}, []);

	return (
		<div ref={ref} class="relative" onMouseEnter={enter} onMouseLeave={leave}>
			<a
				class="inline-flex items-center gap-1 text-sm font-semibold text-muted transition-colors duration-200 hover:text-ink"
				href={item.href}
			>
				{item.label}
				<svg
					class="h-3 w-3 opacity-60 transition-transform duration-300"
					style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden="true"
				>
					<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</a>

			{/* Dropdown panel */}
			<div
				class="absolute left-0 top-full z-50 min-w-[220px] pt-2"
				style={{
					opacity: open ? 1 : 0,
					transform: open ? 'translateY(0)' : 'translateY(-8px)',
					pointerEvents: open ? 'auto' : 'none',
					transition: 'opacity 250ms cubic-bezier(0.16,1,0.3,1), transform 250ms cubic-bezier(0.16,1,0.3,1)',
				}}
			>
				<div class="rounded-2xl border border-(--color-line-soft) bg-surface py-2 shadow-(--shadow-medium)">
					{item.children?.map(child => (
						<a
							key={child.href}
							class="block px-5 py-2.5 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-(--color-surface-strong) hover:text-ink"
							href={child.href}
						>
							{child.label}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}

/* ─── Mobile Menu ─── */
function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
	const [moreOpen, setMoreOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Lock body scroll when open
	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	}, [open]);

	// Close on Escape
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [open, onClose]);

	return (
		<>
			{/* Backdrop */}
			<div
				class="fixed inset-0 z-30 backdrop-blur-sm"
				style={{
					background: 'rgba(0,0,0,0.06)',
					opacity: open ? 1 : 0,
					pointerEvents: open ? 'auto' : 'none',
					transition: 'opacity 300ms ease',
				}}
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Panel */}
			<div
				ref={menuRef}
				class="fixed left-0 right-0 top-[52px] z-40 overflow-y-auto md:hidden"
				style={{
					background: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 78%, transparent), var(--color-header-bg))',
					maxHeight: 'calc(100dvh - 52px)',
					opacity: open ? 1 : 0,
					transform: open ? 'translateY(0)' : 'translateY(-12px)',
					pointerEvents: open ? 'auto' : 'none',
					transition: 'opacity 300ms cubic-bezier(0.16,1,0.3,1), transform 300ms cubic-bezier(0.16,1,0.3,1)',
				}}
				aria-hidden={!open}
			>
				<div class="space-y-2 px-5 pt-4 pb-4">
					{mobileVisibleNav.map(item =>
						item.children ? (
							<div key={item.href} class="rounded-2xl border border-(--color-line-soft) bg-surface p-3 shadow-(--shadow-soft)">
								<a class="block px-1 py-1 text-sm font-semibold text-ink" href={item.href}>{item.label}</a>
								<div class="mt-2 space-y-1">
									{item.children.map(child => (
										<a
											key={child.href}
											class="block rounded-xl px-3 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-(--color-surface-strong) hover:text-ink"
											href={child.href}
										>
											{child.label}
										</a>
									))}
								</div>
							</div>
						) : (
							<a
								key={item.href}
								class="block rounded-2xl border border-(--color-line-soft) bg-surface px-4 py-3 text-sm font-semibold text-ink shadow-(--shadow-soft)"
								href={item.href}
							>
								{item.label}
							</a>
						)
					)}

					{/* More collapsible */}
					<div class="rounded-2xl border border-(--color-line-soft) bg-surface shadow-(--shadow-soft)">
						<button
							type="button"
							class="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-ink"
							onClick={() => setMoreOpen(prev => !prev)}
							aria-expanded={moreOpen}
						>
							More
							<svg
								class="h-4 w-4 text-muted transition-transform duration-300"
								style={{ transform: moreOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
								viewBox="0 0 12 12"
								fill="none"
								aria-hidden="true"
							>
								<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						</button>
						<div
							style={{
								maxHeight: moreOpen ? '500px' : '0',
								overflow: 'hidden',
								transition: 'max-height 350ms cubic-bezier(0.16,1,0.3,1)',
							}}
						>
							<div class="px-3 pb-3 space-y-1">
								{mobileMoreNav.map(item =>
									item.children ? (
										<div key={item.href}>
											<a class="block px-1 py-1 text-sm font-semibold text-ink" href={item.href}>{item.label}</a>
											<div class="mt-1 space-y-1">
												{item.children.map(child => (
													<a
														key={child.href}
														class="block rounded-xl px-3 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-(--color-surface-strong) hover:text-ink"
														href={child.href}
													>
														{child.label}
													</a>
												))}
											</div>
										</div>
									) : (
										<a
											key={item.href}
											class="block rounded-xl px-3 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-(--color-surface-strong) hover:text-ink"
											href={item.href}
										>
											{item.label}
										</a>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

/* ─── Header (exported) ─── */
export default function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const closeMobile = useCallback(() => setMobileOpen(false), []);

	return (
		<>
			<header class="fixed md:sticky top-0 left-0 right-0 z-40 border-b border-(--color-line-soft) bg-(--color-header-bg) backdrop-blur-xl">
				{/* Desktop */}
				<div class="mx-auto hidden max-w-6xl items-center justify-between px-4 py-4 md:flex md:px-6 lg:px-10">
					<a class="group flex items-center gap-4" href="/" aria-label="Morning Tide Consulting and Collective home">
						<div class="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line) bg-surface text-lg font-semibold text-(--color-brand) shadow-(--shadow-soft) transition-transform duration-300 group-hover:scale-105">
							MCC
						</div>
						<div>
							<p class="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-(--color-brand)">Morning Tide Consulting</p>
							<p class="text-lg font-semibold text-ink md:text-xl">&amp; Collective</p>
						</div>
					</a>

					<nav aria-label="Primary" class="hidden items-center gap-6 md:flex">
						{navigation.map(item =>
							item.children ? (
								<DesktopDropdown key={item.href} item={item} />
							) : (
								<a key={item.href} class="text-sm font-semibold text-muted transition-colors duration-200 hover:text-ink" href={item.href}>
									{item.label}
								</a>
							)
						)}
					</nav>

					<div class="hidden items-center gap-2.5 md:flex">
						<ThemeToggle />
						<a
							class="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-(--color-button-ink) shadow-(--shadow-brand) transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand)"
							href="/#contact"
						>
							Inquire Now
						</a>
					</div>
				</div>

				{/* Mobile */}
				<div class="flex items-center justify-between px-4 py-3 md:hidden">
					<a
						class="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-(--color-button-ink) shadow-(--shadow-brand) transition-all duration-300 hover:-translate-y-0.5"
						href="/#contact"
					>
						Inquire Now
					</a>
					<div class="flex items-center gap-2">
						<ThemeToggle />
						<button
							type="button"
							class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted shadow-sm transition-all duration-300 hover:text-ink hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand)"
							aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={mobileOpen}
							onClick={() => setMobileOpen(prev => !prev)}
						>
							{/* Animated hamburger → X */}
							<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<line
									x1="3" y1="6" x2="21" y2="6"
									stroke="currentColor" stroke-width="2" stroke-linecap="round"
									style={{
										transform: mobileOpen ? 'rotate(45deg) translate(4px, -4px)' : 'none',
										transformOrigin: 'center',
										transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
									}}
								/>
								<line
									x1="3" y1="12" x2="21" y2="12"
									stroke="currentColor" stroke-width="2" stroke-linecap="round"
									style={{
										opacity: mobileOpen ? 0 : 1,
										transition: 'opacity 200ms ease',
									}}
								/>
								<line
									x1="3" y1="18" x2="21" y2="18"
									stroke="currentColor" stroke-width="2" stroke-linecap="round"
									style={{
										transform: mobileOpen ? 'rotate(-45deg) translate(4px, 4px)' : 'none',
										transformOrigin: 'center',
										transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
									}}
								/>
							</svg>
						</button>
					</div>
				</div>
			</header>

			<MobileNav open={mobileOpen} onClose={closeMobile} />
		</>
	);
}
