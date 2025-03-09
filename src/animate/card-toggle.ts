import { animate } from 'motion';

export const openCard = async (projectId: string) => {
	const card = document.getElementById(`card-${projectId}`);
	if (!card) return;

	const div = document.createElement('div');
	div.id = 'replacement-card';
	div.style.width = `100%`;
	div.style.height = `100%`;
	div.style.minHeight = '200px';
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
		{ duration: 0.35, ease: 'backInOut' },
	);

	card.style.top = `8vh`;
	card.style.left = `8vw`;
	card.style.width = `84vw`;
	card.style.height = `84vh`;
};

export const closeCard = async (projectId: string) => {
	const card = document.getElementById(`card-${projectId}`);
	const div = document.getElementById('replacement-card');
	if (!card || !div) return;

	const divRect = div.getBoundingClientRect();
	const cardRect = card.getBoundingClientRect();

	await animate(
		card,
		{
			top: [cardRect.top, divRect.top],
			left: [cardRect.left, divRect.left],
			width: [cardRect.width, divRect.width],
			height: [cardRect.height, divRect.height],
		},
		{ duration: 0.35, ease: 'backInOut' },
	);

	div.remove();
	card.style.position = '';
	card.style.zIndex = '';
	card.style.top = '';
	card.style.left = '';
	card.style.width = '';
	card.style.height = '';
	card.style.transform = '';
};
