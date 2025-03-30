import type { Variant } from 'motion-v';

export const appearFromBottom: Record<never, Variant> = {
	off: {
		opacity: 0,
		y: 50,
	},
	on: {
		opacity: 1,
		y: 0,
		transition: {
			visualDuration: 0.35,
			type: 'spring',
			bounce: 0.55,
		},
	},
};

export const pathStroke: Record<never, Variant> = {
	off: {
		'--animation': 5000,
	},
	on: {
		'--animation': 0,
		transition: {
			type: 'tween',
			ease: 'easeInOut',
			duration: 4.2,
		},
	},
};
