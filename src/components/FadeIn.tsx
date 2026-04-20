import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';

interface FadeInProps {
	children: ReactNode;
	/** Animation variant */
	as?: 'div' | 'section' | 'article';
	/** Direction to animate from */
	direction?: 'up' | 'down' | 'left' | 'right' | 'none';
	/** Delay in ms */
	delay?: number;
	/** Duration in ms */
	duration?: number;
	/** Distance to travel in px */
	distance?: number;
	/** IntersectionObserver threshold (0-1) */
	threshold?: number;
	/** Extra class names */
	class?: string;
	/** Whether to animate only once */
	once?: boolean;
}

export default function FadeIn({
	children,
	as: Tag = 'div',
	direction = 'up',
	delay = 0,
	duration = 700,
	distance = 24,
	threshold = 0.15,
	class: className = '',
	once = true,
}: FadeInProps) {
	const ref = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// Respect prefers-reduced-motion
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					if (once) observer.unobserve(el);
				} else if (!once) {
					setVisible(false);
				}
			},
			{ threshold, rootMargin: '0px 0px -40px 0px' }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold, once]);

	const translate = useCallback(() => {
		if (visible) return 'translate3d(0,0,0)';
		switch (direction) {
			case 'up': return `translate3d(0,${distance}px,0)`;
			case 'down': return `translate3d(0,-${distance}px,0)`;
			case 'left': return `translate3d(${distance}px,0,0)`;
			case 'right': return `translate3d(-${distance}px,0,0)`;
			case 'none': return 'translate3d(0,0,0)';
		}
	}, [visible, direction, distance]);

	return (
		<Tag
			ref={ref}
			className={className}
			style={{
				opacity: visible ? 1 : 0,
				transform: translate(),
				transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
				willChange: 'opacity, transform',
			}}
		>
			{children}
		</Tag>
	);
}
