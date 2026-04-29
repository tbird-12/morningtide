import type { CSSProperties, ReactNode } from 'react';

interface FadeInProps {
	children: ReactNode;
	as?: 'div' | 'section' | 'article';
	direction?: 'up' | 'down' | 'left' | 'right' | 'none';
	delay?: number;
	duration?: number;
	distance?: number;
	threshold?: number;
	class?: string;
	once?: boolean;
}

export default function FadeIn({
	children,
	as: Tag = 'div',
	direction = 'up',
	delay = 0,
	duration = 700,
	distance = 24,
	class: className = '',
}: FadeInProps) {
	const style = {
		'--enter-delay': `${delay}ms`,
		'--enter-duration': `${duration}ms`,
		'--enter-distance': `${distance}px`,
	} as CSSProperties;

	return (
		<Tag className={`enter-fade enter-fade--${direction} ${className}`.trim()} style={style}>
			{children}
		</Tag>
	);
}
