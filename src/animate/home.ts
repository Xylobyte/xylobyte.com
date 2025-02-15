import anime, { type AnimeInstance } from 'animejs';

export class AnimateHome {
	private observer: IntersectionObserver;
	private animations: { el: Element; animation: AnimeInstance }[] = [];

	constructor() {
		this.observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const animation = this.animations.find((a) => a.el === entry.target)?.animation;
						if (!animation) continue;
						animation.play();
						this.observer.unobserve(entry.target);
					}
				}
			},
			{ rootMargin: '-50% 0%' },
		);
	}

	destroy = () => {
		this.observer.disconnect();
	};

	init = () => {
		const elements = document.querySelectorAll('.scroll-animate');

		elements.forEach((el) => {
			this.animations.push({
				el: el,
				animation: anime({
					targets: el.children,
					opacity: [0, 1],
					delay: anime.stagger(200),
					duration: 600,
					easing: 'linear',
					autoplay: false,
				}),
			});
		});

		elements.forEach((el) => this.observer.observe(el));
	};
}
