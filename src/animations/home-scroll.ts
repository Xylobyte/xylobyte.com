import type { Variant } from 'motion-v';

export const appearFromBottom: Record<never, Variant> = import.meta.env.SSR
	? {}
	: {
			off: {
				opacity: 0,
				y: 50,
			},
			on: (delay = 0) => ({
				opacity: 1,
				y: 0,
				transition: {
					delay: delay,
					visualDuration: 0.5,
					type: 'spring',
					bounce: 0.55,
				},
			}),
		};

export const appearFromLeft: Record<never, Variant> = import.meta.env.SSR
	? {}
	: {
			off: {
				opacity: 0,
				x: -50,
			},
			on: (delay = 0) => ({
				opacity: 1,
				x: 0,
				transition: {
					delay: delay,
					visualDuration: 0.5,
					type: 'spring',
					bounce: 0.55,
				},
			}),
		};

export const appearFromRight: Record<never, Variant> = import.meta.env.SSR
	? {}
	: {
			off: {
				opacity: 0,
				x: 50,
			},
			on: (delay = 0) => ({
				opacity: 1,
				x: 0,
				transition: {
					delay: delay,
					visualDuration: 0.5,
					type: 'spring',
					bounce: 0.55,
				},
			}),
		};

export const inViewCustomOptions = import.meta.env.SSR ? {} : ({ once: false, margin: '10000% 0px -25% 0px' } as never);
