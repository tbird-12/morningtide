import { useState, useEffect, useRef } from 'preact/hooks';

interface AnimatedTextProps {
	/** Text content */
	text: string;
	/** HTML tag */
	as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
	/** Split by 'word' or 'line' */
	split?: 'word' | 'none';
	/** Stagger between words in ms */
	stagger?: number;
	/** Base delay */
	delay?: number;
	/** Duration per element */
	duration?: number;
	class?: string;
}

/**
 * Animates text with a word-by-word or whole fade-in entrance.
 * Uses CSS transforms for smooth 60fps animation.
 */
export default function AnimatedText({
	text,
	as: Tag = 'h1',
	split = 'word',
	stagger = 50,
	delay = 0,
	duration = 600,
	class: className = '',
}: AnimatedTextProps) {
	const ref = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(el);
				}
			},
			{ threshold: 0.2 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	if (split === 'none') {
		return (
			<Tag
				ref={ref}
				class={className}
				style={{
					opacity: visible ? 1 : 0,
					transform: visible ? 'translateY(0)' : 'translateY(20px)',
					transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
				}}
			>
				{text}
			</Tag>
		);
	}

	const words = text.split(' ');

	return (
		<Tag ref={ref} class={className} aria-label={text}>
			{words.map((word, i) => (
				<span
					key={i}
					class="inline-block"
					style={{
						opacity: visible ? 1 : 0,
						transform: visible ? 'translateY(0)' : 'translateY(12px)',
						transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms`,
					}}
					aria-hidden="true"
				>
					{word}{i < words.length - 1 ? '\u00A0' : ''}
				</span>
			))}
		</Tag>
	);
}
