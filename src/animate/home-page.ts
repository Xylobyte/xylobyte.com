import { animate, inView, stagger } from 'motion';

export const initHomeSectionsAnimations = () =>
	inView(
		'.scroll-animate',
		(el) => {
			if (el.id === 'presentation' || el.id === 'projects' || el.id === 'about') {
				const els = el.querySelectorAll(
					`:scope > *:not(:first-child, ${el.id === 'about' ? '.bg-about, .grid-info' : ':last-child'})${el.id === 'about' ? ', :scope .box-info' : ''}`,
				);
				animate([
					[
						els,
						{ opacity: 1, y: [100, 0] },
						{
							duration: 0.4,
							delay: stagger(0.15),
							ease: 'backInOut',
						},
					],
					[
						`#${el.id} > div.from-right`,
						{
							opacity: 1,
							x: ['50%', 0],
						},
						{ duration: 0.4, ease: 'backInOut' },
					],
				]);
			} else if (el.id === 'skills') {
				const ps = el.querySelectorAll(':scope > p');
				animate([
					[
						ps,
						{ opacity: 1, y: [100, 0] },
						{
							duration: 0.4,
							delay: stagger(0.15),
							ease: 'backInOut',
						},
					],
					[
						'.soft-skills-ct',
						{ opacity: 1, x: [-200, 0] },
						{
							duration: 0.4,
							ease: 'backInOut',
							at: 0.45,
						},
					],
					[
						'.hard-skills-ct',
						{ opacity: 1, x: [200, 0] },
						{
							duration: 0.4,
							ease: 'backInOut',
							at: 0.6,
						},
					],
					[
						'.language-skills-ct',
						{ opacity: 1, y: [200, 0] },
						{
							duration: 0.4,
							ease: 'backInOut',
							at: 0.75,
						},
					],
				]);
			} else if (el.id === 'contact') {
				animate([
					[
						'#contact-form > *:not(span)',
						{ opacity: 1, y: [100, 0] },
						{ duration: 0.4, ease: 'backInOut', delay: stagger(0.15) },
					],
					[
						'.contact-btn > *',
						{ opacity: 1, x: [200, 0] },
						{
							duration: 0.4,
							ease: 'backInOut',
							delay: stagger(0.15),
							at: 0.8,
						},
					],
				]);
			}
		},
		{ margin: '-50% 0%' },
	);
