import type { Variant } from 'motion-v';

export const appearFromBottom: Record<never, Variant> = {
	off: {
		opacity: 0,
		y: 50,
	},
	on: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: delay,
			visualDuration: 0.35,
			type: 'spring',
			bounce: 0.55,
		},
	}),
};

export const inViewCustomOptions = { once: false, margin: '10000% 0px -25% 0px' } as never;
