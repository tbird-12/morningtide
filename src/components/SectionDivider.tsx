'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionDividerProps {
	/** Visual style */
	variant?: 'line' | 'dots' | 'wave';
	/** Extra class names */
	className?: string;
}

/**
 * Animated section divider that provides visual breathing room between content blocks.
 */
export default function SectionDivider({
	variant = 'line',
	className = '',
}: SectionDividerProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.5 });

	if (variant === 'dots') {
		return (
			<div ref={ref} className={`flex items-center justify-center gap-3 py-12 md:py-16 ${className}`}>
				{[0, 1, 2].map(i => (
					<motion.span
						key={i}
						className="block h-1.5 w-1.5 rounded-full bg-(--color-brand)"
						initial={{ opacity: 0, scale: 0 }}
						animate={isInView ? { opacity: 0.5, scale: 1 } : { opacity: 0, scale: 0 }}
						transition={{ duration: 0.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
					/>
				))}
			</div>
		);
	}

	if (variant === 'wave') {
		return (
			<div ref={ref} className={`py-10 md:py-14 ${className}`}>
				<motion.svg
					viewBox="0 0 1200 40"
					className="mx-auto w-full max-w-3xl"
					preserveAspectRatio="none"
					initial={{ opacity: 0, scaleX: 0.6 }}
					animate={isInView ? { opacity: 0.2, scaleX: 1 } : { opacity: 0, scaleX: 0.6 }}
					transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
				>
					<path
						d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20"
						fill="none"
						stroke="var(--color-brand)"
						strokeWidth="1.5"
					/>
				</motion.svg>
			</div>
		);
	}

	// Default: line
	return (
		<div ref={ref} className={`py-10 md:py-14 ${className}`}>
			<motion.div
				className="mx-auto h-px max-w-md"
				style={{ background: 'linear-gradient(90deg, transparent, var(--color-line), transparent)' }}
				initial={{ opacity: 0, scaleX: 0 }}
				animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			/>
		</div>
	);
}
