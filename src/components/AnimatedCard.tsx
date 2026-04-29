import type { CSSProperties, ReactNode } from 'react';

interface AnimatedCardProps {
	children: ReactNode;
	href?: string;
	className?: string;
	index?: number;
	stagger?: number;
}

export default function AnimatedCard({
	children,
	href,
	className = '',
	index = 0,
	stagger = 120,
}: AnimatedCardProps) {
	const style = {
		'--enter-delay': `${index * stagger}ms`,
		'--enter-duration': '600ms',
		'--enter-distance': '20px',
	} as CSSProperties;

	const baseClass = `premium-card enter-card rounded-[1.75rem] p-6 ${className}`.trim();

	if (href) {
		return (
			<a href={href} className={baseClass} style={style}>
				{children}
			</a>
		);
	}

	return (
		<div className={baseClass} style={style}>
			{children}
		</div>
	);
}
