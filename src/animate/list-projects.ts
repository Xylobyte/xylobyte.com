import { animate, stagger } from 'motion';

export const initListProjects = () =>
	animate(
		'.grid-projects > *',
		{ opacity: [0, 1], y: [100, 0] },
		{
			duration: 0.4,
			delay: stagger(0.25),
			ease: 'linear',
		},
	);
