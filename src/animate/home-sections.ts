import { animate, inView, stagger } from 'motion';

export const initHomeSectionsAnimations = () =>
	inView(
		'.scroll-animate',
		(el) => {
			if (el.id === 'presentation') {
				animate(
					[...el.children].slice(1),
					{ opacity: [1], y: [100, 0] },
					{
						duration: 0.4,
						delay: stagger(0.15),
						ease: 'backInOut',
					},
				);
			} else if (el.id === 'skills') {
				const ps = el.querySelectorAll('p');
				animate([
					[
						ps,
						{ opacity: [1], y: [100, 0] },
						{
							duration: 0.4,
							delay: stagger(0.15),
							ease: 'backInOut',
						},
					],
					[
						'.soft-skills-ct',
						{ opacity: [0, 1], x: [-200, 0] },
						{
							duration: 0.4,
							ease: 'backInOut',
							at: 0.45,
						},
					],
					[
						'.hard-skills-ct',
						{ opacity: [0, 1], x: [200, 0] },
						{
							duration: 0.4,
							ease: 'backInOut',
							at: 0.6,
						},
					],
					[
						'.language-skills-ct',
						{ opacity: [0, 1], x: [-200, 0] },
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
