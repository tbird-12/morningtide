'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ImageBreakProps {
	/** Image source path */
	src: string;
	/** Alt text for accessibility */
	alt: string;
	/** Optional caption below image */
	caption?: string;
	/** Layout variant */
	variant?: 'full' | 'inset' | 'side';
	/** Aspect ratio class (Tailwind) */
	aspect?: string;
	/** Extra class names */
	className?: string;
}

/**
 * Visual section break with a gently animated image.
 * Use between text-heavy sections to create visual breathing room.
 *
 * Variants:
 *  - "full"  — edge-to-edge within the content well
 *  - "inset" — centered with rounded corners and soft shadow
 *  - "side"  — narrower, offset for visual interest
 */
export default function ImageBreak({
	src,
	alt,
	caption,
	variant = 'inset',
	aspect = 'aspect-[16/9]',
	className = '',
}: ImageBreakProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	const wrapperClass = {
		full: 'w-full',
		inset: 'mx-auto max-w-4xl px-4',
		side: 'mx-auto max-w-2xl px-4',
	}[variant];

	const imgClass = {
		full: 'rounded-2xl',
		inset: 'rounded-3xl shadow-(--shadow-medium) border border-(--color-line-soft)',
		side: 'rounded-2xl shadow-(--shadow-soft)',
	}[variant];

	return (
		<figure ref={ref} className={`my-12 md:my-20 ${wrapperClass} ${className}`}>
			<motion.div
				className="overflow-hidden"
				initial={{ opacity: 0, y: 24, scale: 0.97 }}
				animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.97 }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			>
				<img
					src={src}
					alt={alt}
					className={`w-full object-cover ${aspect} ${imgClass}`}
					loading="lazy"
					decoding="async"
				/>
			</motion.div>
			{caption && (
				<motion.figcaption
					className="mt-4 text-center text-sm text-(--color-muted)"
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					{caption}
				</motion.figcaption>
			)}
		</figure>
	);
}
