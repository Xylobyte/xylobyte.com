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
	card.style.zIndex = '9';

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

	card.style.top = `8dvh`;
	card.style.left = `8dvw`;
	card.style.width = `84dvw`;
	card.style.height = `84dvh`;
};

export const closeCard = async (projectId: string) => {
	console.log('Close card');
	const card = document.getElementById(`card-${projectId}`);
	const div = document.getElementById('replacement-card');
	if (!card || !div) return;

	const cardRect = card.getBoundingClientRect();
	const divRect = div.getBoundingClientRect();

	await animate(
		card,
		{
			top: [cardRect.top, divRect.top],
			left: [cardRect.left, divRect.left],
			width: [cardRect.width, divRect.width],
			height: [cardRect.height, divRect.height],
		},
		{ duration: 0.4, ease: 'backInOut' },
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
