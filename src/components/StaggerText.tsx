'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StaggerTextProps {
	/** Text content */
	text: string;
	/** HTML tag */
	as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
	/** Split mode */
	split?: 'word' | 'none';
	/** Stagger between words in seconds */
	stagger?: number;
	/** Base delay in seconds */
	delay?: number;
	/** Duration per element in seconds */
	duration?: number;
	className?: string;
}

/**
 * Framer Motion powered staggered text reveal.
 * Words slide up and fade in with spring physics for a premium feel.
 */
export default function StaggerText({
	text,
	as: Tag = 'h1',
	split = 'word',
	stagger = 0.04,
	delay = 0,
	duration = 0.5,
	className = '',
}: StaggerTextProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	if (split === 'none') {
		return (
			<motion.div
				ref={ref}
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
			>
				<Tag className={className}>{text}</Tag>
			</motion.div>
		);
	}

	const words = text.split(' ');

	return (
		<Tag ref={ref} className={className} aria-label={text}>
			{words.map((word, i) => (
				<motion.span
					key={i}
					className="inline-block"
					initial={{ opacity: 0, y: 14 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
					transition={{
						duration,
						delay: delay + i * stagger,
						ease: [0.16, 1, 0.3, 1],
					}}
					aria-hidden="true"
				>
					{word}{i < words.length - 1 ? '\u00A0' : ''}
				</motion.span>
			))}
		</Tag>
	);
}
