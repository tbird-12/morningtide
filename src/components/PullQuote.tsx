'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface PullQuoteProps {
	/** The quote text */
	children: ReactNode;
	/** Optional attribution */
	cite?: string;
	/** Extra class names */
	className?: string;
}

/**
 * An animated pull-quote or callout that draws attention and breaks up long text.
 * Fades in with a decorative accent line.
 */
export default function PullQuote({
	children,
	cite,
	className = '',
}: PullQuoteProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<motion.blockquote
			ref={ref}
			className={`relative my-12 border-l-4 border-(--color-brand) pl-6 md:my-16 md:pl-8 ${className}`}
			initial={{ opacity: 0, x: -20 }}
			animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
			transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
		>
			<p className="font-display text-xl leading-relaxed text-(--color-ink) md:text-2xl">
				{children}
			</p>
			{cite && (
				<cite className="mt-3 block text-sm not-italic text-(--color-muted)">
					— {cite}
				</cite>
			)}
		</motion.blockquote>
	);
}
