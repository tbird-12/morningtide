import { useRef, useState, useEffect, type ReactNode } from 'react';

interface AnimatedCardProps {
	children: ReactNode;
	href?: string;
	className?: string;
	/** Index for stagger delay when used in a grid */
	index?: number;
	/** Base stagger delay in ms */
	stagger?: number;
}

/**
 * Premium card with subtle hover lift, glow effect, and scroll-triggered entrance.
 */
export default function AnimatedCard({
	children,
	href,
	className = '',
	index = 0,
	stagger = 120,
}: AnimatedCardProps) {
	const ref = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(el);
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const delay = index * stagger;
	const style = {
		opacity: visible ? 1 : 0,
		transform: visible ? 'translateY(0)' : 'translateY(20px)',
		transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, box-shadow 500ms cubic-bezier(0.16,1,0.3,1), border-color 300ms ease`,
	};

	const baseClass = `premium-card rounded-[1.75rem] p-6 ${className}`;

	if (href) {
		return (
			<a ref={ref as any} href={href} className={baseClass} style={style}>
				{children}
			</a>
		);
	}

	return (
		<div ref={ref as any} className={baseClass} style={style}>
			{children}
		</div>
	);
}
