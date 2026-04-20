'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface MotionFadeInProps {
	children: ReactNode;
	/** Direction to animate from */
	direction?: 'up' | 'down' | 'left' | 'right' | 'none';
	/** Delay in seconds */
	delay?: number;
	/** Duration in seconds */
	duration?: number;
	/** Distance to travel in px */
	distance?: number;
	/** IntersectionObserver threshold (0-1) */
	threshold?: number;
	/** Extra class names */
	className?: string;
	/** Whether to animate only once */
	once?: boolean;
	/** HTML tag */
	as?: 'div' | 'section' | 'article';
}

const directionMap = {
	up: { y: 1, x: 0 },
	down: { y: -1, x: 0 },
	left: { x: 1, y: 0 },
	right: { x: -1, y: 0 },
	none: { x: 0, y: 0 },
};

/**
 * Framer Motion powered fade-in with direction, distance, and viewport trigger.
 * Drop-in replacement for FadeIn but with spring physics and smoother animation.
 */
export default function MotionFadeIn({
	children,
	direction = 'up',
	delay = 0,
	duration = 0.7,
	distance = 30,
	threshold = 0.15,
	className = '',
	once = true,
	as = 'div',
}: MotionFadeInProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once, amount: threshold });

	const dir = directionMap[direction];
	const MotionTag = motion[as];

	return (
		<MotionTag
			ref={ref}
			className={className}
			initial={{ opacity: 0, x: dir.x * distance, y: dir.y * distance }}
			animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: dir.x * distance, y: dir.y * distance }}
			transition={{
				duration,
				delay,
				ease: [0.16, 1, 0.3, 1],
			}}
		>
			{children}
		</MotionTag>
	);
}
