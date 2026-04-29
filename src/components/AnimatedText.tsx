import type { CSSProperties } from 'react';

interface AnimatedTextProps {
	text: string;
	as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
	split?: 'word' | 'none';
	stagger?: number;
	delay?: number;
	duration?: number;
	class?: string;
}

export default function AnimatedText({
	text,
	as: Tag = 'h1',
	split = 'word',
	stagger = 50,
	delay = 0,
	duration = 600,
	class: className = '',
}: AnimatedTextProps) {
	if (split === 'none') {
		return (
			<Tag
				className={`enter-fade enter-fade--up ${className}`.trim()}
				style={
					{
						'--enter-delay': `${delay}ms`,
						'--enter-duration': `${duration}ms`,
						'--enter-distance': '18px',
					} as CSSProperties
				}
			>
				{text}
			</Tag>
		);
	}

	const words = text.split(' ');

	return (
		<Tag className={className} aria-label={text}>
			{words.map((word, index) => (
				<span
					key={`${word}-${index}`}
					className="enter-word"
					style={
						{
							'--word-delay': `${delay + index * stagger}ms`,
							'--word-duration': `${duration}ms`,
							'--enter-distance': '12px',
						} as CSSProperties
					}
					aria-hidden="true"
				>
					{word}
					{index < words.length - 1 ? '\u00A0' : ''}
				</span>
			))}
		</Tag>
	);
}
