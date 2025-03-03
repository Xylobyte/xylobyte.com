<script lang="ts" setup>
	import SectionTitleComponent from '@/components/home/SectionTitleComponent.vue';
	import ButtonComponent from '@/components/ButtonComponent.vue';
	import { GitHubIcon, LinkedInIcon } from 'vue3-simple-icons';
</script>

<template>
	<section id="about" class="adaptative-viewport-height p-relative flex column scroll-animate">
		<SectionTitleComponent class="title-sec" title="A propos" />

		<div class="bg-about p-absolute"></div>

		<div class="grid-info gap30">
			<div class="box-info infos flex column gap15 p-relative opacity-0">
				<h3 class="chakra-petch f-large p-absolute">Infos</h3>

				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Adresse :</span> <span class="jura">63680 Chastreix, France</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Date de naissance :</span> <span class="jura">18 avril 2006</span>
				</div>
			</div>
			<div class="box-info find-work flex column gap15 p-relative opacity-0">
				<h3 class="chakra-petch f-large p-absolute">Recherche d'emploi</h3>

				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Titre de l'emploi :</span>
					<span class="jura">Développeur Web - Full stack</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Contrat :</span> <span class="jura">Alternance / Stage</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Localisation :</span>
					<span class="jura">Full remote / Hybrid (Région Puy de Dome)</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Compétences :</span>
					<span class="jura">Vue.JS / React.JS / Laravel / MySQL / NoSQL / Git / WordPress</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Infos supplémentaires :</span>
					<span class="jura"
						>Je suis disponible à partir de septembre, pour plus d'infos, n'hésitez pas à me contacter</span
					>
				</div>
			</div>
			<div class="box-info hobbies flex column gap15 p-relative opacity-0">
				<h3 class="chakra-petch f-large p-absolute">Centres d'intérêt</h3>

				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Montage vidéo :</span>
					<span class="jura"
						>J'aime particulièrement les effets spéciaux et j'utilise le logiciel DaVinci Resolve pour le
						montage</span
					>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Modélisation 3D :</span>
					<span class="jura"
						>J'apprécie beaucoup créer des images ou de courtes animations avec le logiciel Blender</span
					>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Lecture :</span>
					<span class="jura">
						Le style que je préfère c'est la science-fiction. J'aime les romans autant que les BD. Par
						exemple: Foundation / Silo / Yoko Tsuno / Blake et Mortimer / Blueberry
					</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Gaming :</span>
					<span class="jura">
						Là encore, j'aime la science-fiction ainsi que le style anime avec des titres comme: No Man's
						Sky / Genshin Impact / Arknights
					</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Photographie :</span>
					<span class="jura">
						J'aime bien la photo macro de plantes et d'insectes, je fais la plupart de mes photos avec un
						smartphone Samsung série S
					</span>
				</div>
				<div class="ct-card-text flex row j-space-between a-center">
					<span class="jura bold">Musique :</span>
					<span class="jura">
						Je joue de la Guitare depuis 10 ans comme passe temps. J'écoute aussi beaucoup de musique
						principalement electro mais aussi beaucoup d'autres styles
					</span>
				</div>
			</div>
			<div class="box-info links p-relative opacity-0 gap25">
				<h3 class="chakra-petch f-large p-absolute">Liens</h3>

				<ButtonComponent
					:icon="GitHubIcon"
					background-color="50, 50, 50"
					class="flex a-center j-center"
					color="255, 255, 255"
					link="https://github.com/Xylobyte"
					text="GitHub"
				/>
				<ButtonComponent
					:icon="LinkedInIcon"
					background-color="10, 101, 192"
					class="flex a-center j-center"
					color="255, 255, 255"
					link="https://www.linkedin.com/in/nantsa-montillet"
					text="LinkedIn"
				/>
				<ButtonComponent
					background-color="242, 187, 19"
					class="flex a-center j-center"
					color="255, 255, 255"
					link="https://www.codingame.com/profile/6a09b7f196bb6fae61ca49b75d3a8e5b6810864"
					text="CodinGame"
				/>
				<ButtonComponent
					background-color="0, 0, 0"
					class="flex a-center j-center"
					color="255, 255, 255"
					link="https://app.daily.dev/xylobyte"
					text="Daily.dev"
				/>
			</div>
		</div>

		<ButtonComponent
			background-color="102, 88, 185"
			class="btn-cv flex a-center j-center opacity-0"
			color="255, 255, 255"
			link="/storage/nm_cv.pdf"
			text="Télécharger mon CV"
		/>
	</section>
</template>

<style lang="scss" scoped>
	.bg-about {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url('@/assets/images/backgrounds/bg_grid_about.svg') repeat;
		background-size: 30px;
		opacity: 0.3;
	}

	.title-sec {
		background-color: white;
		width: max-content;
		border-radius: var(--main-border-radius);
	}

	.grid-info {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		margin-top: 40px;
		max-width: 1200px;

		.box-info {
			background-color: white;
			border: var(--light-primary-color) 2px dashed;
			border-radius: var(--main-border-radius);
			padding: 25px;

			h3 {
				top: -18px;
				background-color: white;
				padding: 0 10px;
				border-radius: var(--main-border-radius);
			}

			.ct-card-text {
				gap: 5vw;

				span.bold {
					flex-shrink: 0;
				}

				span:last-child {
					text-align: right;
				}
			}

			&.infos {
				grid-column: 1;
				grid-row: 1;
			}

			&.find-work {
				grid-column: 2;
				grid-row: 1 / 3;
				border-color: #ce412b;
			}

			&.hobbies {
				grid-column: 1;
				grid-row: 2 / 5;
				border-color: #27c77e;
			}

			&.links {
				grid-column: 2;
				grid-row: 3 / 5;
				border-color: #3c7bcc;
				display: grid;
				grid-template-columns: repeat(2, 1fr);

				h3 {
					left: 25px;
				}
			}
		}
	}

	.btn-cv {
		margin-top: 50px;
		margin-bottom: 20px;
	}

	@media (max-width: 1200px) {
		.grid-info {
			display: flex;
			flex-direction: column;

			.box-info {
				padding: 15px;
			}

			.box-info.links {
				gap: 10px;
			}
		}
	}
</style>
