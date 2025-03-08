import { animate } from 'motion';

export const openCard = async (projectId: string) => {
	const card = document.getElementById(`card-${projectId}`);
	if (!card) return;

	// document.body.classList.add('no-scroll');

	const div = document.createElement('div');
	div.id = 'replacement-card';
	div.style.width = `100%`;
	div.style.height = `100%`;
	card.parentElement?.insertBefore(div, card);

	const rect = div.getBoundingClientRect();
	card.style.position = 'fixed';
	card.style.zIndex = '10';

	const onePercentHeight = window.innerHeight / 100;
	const onePercentWidth = window.innerWidth / 100;
	await animate(
		card,
		{
			scale: 1,
			rotateX: 0,
			rotateY: 0,
			top: [rect.top, onePercentHeight * 8],
			left: [rect.left, onePercentWidth * 8],
			width: [rect.width, onePercentWidth * 84],
			height: [rect.height, onePercentHeight * 84],
		},
		{ duration: 0.4, ease: 'backInOut' },
	);
};

export const closeCard = (projectId: string) => {
	// TODO
};
