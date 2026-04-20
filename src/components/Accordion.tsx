import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';

interface AccordionItemProps {
	title: string;
	children: ReactNode;
	defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
	const [open, setOpen] = useState(defaultOpen);
	const contentRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);

	const toggle = useCallback(() => {
		setOpen(prev => !prev);
	}, []);

	useEffect(() => {
		const el = contentRef.current;
		if (!el) return;
		if (open) {
			setHeight(el.scrollHeight);
			const timer = setTimeout(() => setHeight(undefined), 350);
			return () => clearTimeout(timer);
		} else {
			// Set explicit height first, then collapse
			setHeight(el.scrollHeight);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setHeight(0));
			});
		}
	}, [open]);

	return (
		<div className="border-b border-(--color-line-soft) last:border-b-0">
			<button
				type="button"
				onClick={toggle}
				className="flex w-full cursor-pointer items-start gap-3 py-5 text-left text-base font-semibold text-(--color-ink) transition-colors duration-200 hover:text-(--color-brand)"
				aria-expanded={open}
			>
				<svg
					className="mt-1 h-4 w-4 shrink-0 text-(--color-brand) transition-transform duration-300 ease-out"
					style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden="true"
				>
					<path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
				<span>{title}</span>
			</button>
			<div
				ref={contentRef}
				style={{
					height: height !== undefined ? `${height}px` : 'auto',
					overflow: 'hidden',
					transition: 'height 350ms cubic-bezier(0.16, 1, 0.3, 1)',
				}}
				aria-hidden={!open}
			>
				<div className="pb-5 pl-7">{children}</div>
			</div>
		</div>
	);
}

interface AccordionProps {
	items: Array<{ q: string; a: string }>;
}

export default function Accordion({ items }: AccordionProps) {
	return (
		<div>
			{items.map((item, i) => (
				<AccordionItem key={i} title={item.q}>
				<p className="text-sm leading-7 text-(--color-muted)">{item.a}</p>
				</AccordionItem>
			))}
		</div>
	);
}
