'use client';

import { motion, useInView } from 'framer-motion';
import { Children, useRef, type ReactNode } from 'react';

interface StaggerGridProps {
	/** Grid items */
	children: ReactNode;
	/** Stagger delay between items in seconds */
	stagger?: number;
	/** Columns at different breakpoints */
	columns?: string;
	/** Extra class names for the grid wrapper */
	className?: string;
}

/**
 * A grid that staggers its children into view one by one.
 * Perfect for card grids, feature lists, or process steps.
 */
export default function StaggerGrid({
	children,
	stagger = 0.1,
	columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
	className = '',
}: StaggerGridProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });
	const items = Children.toArray(children);

	return (
		<div ref={ref} className={`grid gap-6 ${columns} ${className}`}>
			{items.map((child, i) => (
				<motion.div
					key={i}
					initial={{ opacity: 0, y: 24 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
					transition={{
						duration: 0.6,
						delay: i * stagger,
						ease: [0.16, 1, 0.3, 1],
					}}
				>
					{child}
				</motion.div>
			))}
		</div>
	);
}
