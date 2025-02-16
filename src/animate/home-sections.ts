import { animate, inView, stagger } from 'motion';

export const initHomeSectionsAnimations = () =>
	inView(
		'.scroll-animate',
		(el) => {
			if (el.id === 'presentation') {
				const els = el.querySelectorAll(':scope > *:not(:last-child, :first-child)');
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
						'#presentation > div.list-path',
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
						{ opacity: 1, x: [-200, 0] },
						{
							duration: 0.4,
							ease: 'backInOut',
							at: 0.75,
						},
					],
				]);
			}
		},
		{ margin: '-50% 0%' },
	);
