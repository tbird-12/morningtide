import { useState, useEffect, useRef, useCallback, type FocusEvent } from 'react';
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

const isActivePath = (currentPath: string, href: string) =>
	currentPath === href || (href !== '/' && currentPath.startsWith(`${href}/`));

const isItemActive = (currentPath: string, item: NavItem) =>
	isActivePath(currentPath, item.href) || item.children?.some((child) => isActivePath(currentPath, child.href)) || false;

const getMobileLinks = (item: NavItem) => {
	if (!item.children) return [];
	return item.children.some((child) => child.href === item.href)
		? item.children
		: [{ label: `All ${item.label}`, href: item.href }, ...item.children];
};

/* ─── Desktop Dropdown ─── */
function DesktopDropdown({ item, currentPath }: { item: NavItem; currentPath: string }) {
	const [open, setOpen] = useState(false);
	const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const active = isItemActive(currentPath, item);

	const enter = useCallback(() => {
		clearTimeout(timeout.current);
		setOpen(true);
	}, []);
	const leave = useCallback(() => {
		timeout.current = setTimeout(() => setOpen(false), 180);
	}, []);

	useEffect(() => {
		return () => clearTimeout(timeout.current);
	}, []);

	const handleBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
			setOpen(false);
		}
	}, []);

	return (
		<div className="relative" onMouseEnter={enter} onMouseLeave={leave} onFocus={enter} onBlur={handleBlur}>
			<a
				className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-200 hover:text-ink ${active ? 'text-ink' : 'text-muted'}`}
				href={item.href}
				aria-expanded={open}
				aria-haspopup="menu"
				aria-current={isActivePath(currentPath, item.href) ? 'page' : undefined}
			>
				{item.label}
				<svg
					className="h-3 w-3 opacity-60 transition-transform duration-300"
					style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden="true"
				>
					<path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</a>

			{/* Dropdown panel */}
			<div
				className="absolute left-0 top-full z-50 min-w-55 pt-2"
				style={{
					opacity: open ? 1 : 0,
					transform: open ? 'translateY(0)' : 'translateY(-8px)',
					pointerEvents: open ? 'auto' : 'none',
					transition: 'opacity 250ms cubic-bezier(0.16,1,0.3,1), transform 250ms cubic-bezier(0.16,1,0.3,1)',
				}}
			>
				<div className="rounded-2xl border border-(--color-line-soft) bg-surface py-2 shadow-(--shadow-medium)" role="menu">
					{item.children?.map(child => (
						<a
							key={child.href}
							className={`block px-5 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-(--color-surface-strong) hover:text-ink ${isActivePath(currentPath, child.href) ? 'text-ink' : 'text-muted'}`}
							href={child.href}
							role="menuitem"
							aria-current={isActivePath(currentPath, child.href) ? 'page' : undefined}
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
function MobileNav({ currentPath, open, onClose }: { currentPath: string; open: boolean; onClose: () => void }) {
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
				className="fixed inset-0 z-30 backdrop-blur-sm"
				style={{
					background: 'var(--color-overlay)',
					opacity: open ? 1 : 0,
					pointerEvents: open ? 'auto' : 'none',
					transition: 'opacity 300ms ease',
				}}
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Panel */}
			<div
				id="mobile-navigation"
				className="fixed left-0 right-0 z-40 overflow-y-auto md:hidden"
				style={{
					background: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 78%, transparent), var(--color-header-bg))',
					top: 'var(--header-height-mobile)',
					maxHeight: 'calc(100dvh - var(--header-height-mobile))',
					opacity: open ? 1 : 0,
					transform: open ? 'translateY(0)' : 'translateY(-12px)',
					pointerEvents: open ? 'auto' : 'none',
					transition: 'opacity 300ms cubic-bezier(0.16,1,0.3,1), transform 300ms cubic-bezier(0.16,1,0.3,1)',
				}}
				aria-hidden={!open}
			>
				<div className="space-y-3 px-4 pt-4 pb-5">
					<a
						className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-(--color-button-ink) shadow-(--shadow-brand) transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
						href="/#contact"
						onClick={onClose}
					>
						Inquire Now
					</a>

					{navigation.map((item) =>
						item.children ? (
							<div key={item.href} className="rounded-2xl border border-(--color-line-soft) bg-surface p-3 shadow-(--shadow-soft)">
								<p className="px-1 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-(--color-brand)">
									{item.label}
								</p>
								<div className="space-y-1">
									{getMobileLinks(item).map((child) => (
										<a
											key={child.href}
											className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-(--color-surface-strong) hover:text-ink ${isActivePath(currentPath, child.href) ? 'bg-(--color-surface-strong) text-ink' : 'text-muted'}`}
											href={child.href}
											onClick={onClose}
											aria-current={isActivePath(currentPath, child.href) ? 'page' : undefined}
										>
											{child.label}
										</a>
									))}
								</div>
							</div>
						) : (
							<a
								key={item.href}
								className={`block rounded-2xl border border-(--color-line-soft) bg-surface px-4 py-3 text-sm font-semibold shadow-(--shadow-soft) ${isActivePath(currentPath, item.href) ? 'text-ink' : 'text-muted'}`}
								href={item.href}
								onClick={onClose}
								aria-current={isActivePath(currentPath, item.href) ? 'page' : undefined}
							>
								{item.label}
							</a>
						),
					)}
				</div>
			</div>
		</>
	);
}

/* ─── Header (exported) ─── */
export default function Header({ currentPath }: { currentPath: string }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const closeMobile = useCallback(() => setMobileOpen(false), []);

	return (
		<>
			<header className="fixed md:sticky top-0 left-0 right-0 z-40 border-b border-(--color-line-soft) bg-(--color-header-bg) backdrop-blur-xl">
				{/* Desktop */}
				<div className="mx-auto hidden max-w-6xl items-center justify-between px-4 py-4 md:flex md:px-6 lg:px-10">
					<a className="group flex items-center gap-4" href="/" aria-label="Morning Tide Consulting and Collective home">
						<div className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line) bg-surface text-lg font-semibold text-(--color-brand) shadow-(--shadow-soft) transition-transform duration-300 group-hover:scale-105">
							MCC
						</div>
						<div>
							<p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-(--color-brand)">Morning Tide Consulting</p>
							<p className="text-lg font-semibold text-ink md:text-xl">&amp; Collective</p>
						</div>
					</a>

					<nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
						{navigation.map(item =>
							item.children ? (
								<DesktopDropdown key={item.href} item={item} currentPath={currentPath} />
							) : (
								<a
									key={item.href}
									className={`text-sm font-semibold transition-colors duration-200 hover:text-ink ${isActivePath(currentPath, item.href) ? 'text-ink' : 'text-muted'}`}
									href={item.href}
									aria-current={isActivePath(currentPath, item.href) ? 'page' : undefined}
								>
									{item.label}
								</a>
							)
						)}
					</nav>

					<div className="hidden items-center gap-2.5 md:flex">
						<ThemeToggle />
						<a
							className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-(--color-button-ink) shadow-(--shadow-brand) transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand)"
							href="/#contact"
						>
							Inquire Now
						</a>
					</div>
				</div>

				{/* Mobile */}
				<div className="flex items-center justify-between gap-3 px-4 py-3 md:hidden">
					<a
						className="group flex min-w-0 items-center gap-3"
						href="/"
						aria-label="Morning Tide Consulting and Collective home"
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-line) bg-surface text-sm font-semibold text-(--color-brand) shadow-(--shadow-soft)">
							MCC
						</div>
						<div className="min-w-0">
							<p className="text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-(--color-brand)">Morning Tide</p>
							<p className="truncate text-sm font-semibold text-ink">&amp; Collective</p>
						</div>
					</a>
					<div className="flex shrink-0 items-center gap-2">
						<ThemeToggle />
						<button
							type="button"
							className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted shadow-sm transition-all duration-300 hover:text-ink hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand)"
							aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={mobileOpen}
							aria-controls="mobile-navigation"
							onClick={() => setMobileOpen(prev => !prev)}
						>
							{/* Animated hamburger → X */}
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<line
									x1="3" y1="6" x2="21" y2="6"
									stroke="currentColor" strokeWidth="2" strokeLinecap="round"
									style={{
										transform: mobileOpen ? 'rotate(45deg) translate(4px, -4px)' : 'none',
										transformOrigin: 'center',
										transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
									}}
								/>
								<line
									x1="3" y1="12" x2="21" y2="12"
									stroke="currentColor" strokeWidth="2" strokeLinecap="round"
									style={{
										opacity: mobileOpen ? 0 : 1,
										transition: 'opacity 200ms ease',
									}}
								/>
								<line
									x1="3" y1="18" x2="21" y2="18"
									stroke="currentColor" strokeWidth="2" strokeLinecap="round"
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

			<MobileNav currentPath={currentPath} open={mobileOpen} onClose={closeMobile} />
		</>
	);
}
