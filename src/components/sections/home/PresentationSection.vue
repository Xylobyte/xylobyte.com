<script lang="ts" setup>
	import SectionTitleComponent from '@/components/SectionTitleComponent.vue';
</script>

<template>
	<section id="presentation" class="adaptative-viewport-height flex column gap10 scroll-animate">
		<SectionTitleComponent title="Présentation" />

		<p class="f-medium jura opacity-0">
			Hello, &#128075;<br /><br />
			Je m'appelle Nantsa Montillet, je suis passionné par la programmation. Après un parcours autodidacte de
			quatre ans, j'ai acquis des compétences solides en programmation, notamment dans les langages C++, Java,
			HTML, CSS et JavaScript. Actuellement en formation chez OpenClassrooms, je me spécialise dans le
			développement web avec une formation de niveau BAC +2.
		</p>

		<img alt="" class="first opacity-0" height="38" src="@/assets/images/p-line.svg" width="364" />

		<p class="f-medium jura left opacity-0">
			J'ai récemment réalisé un site vitrine pour une petite entreprise, mettant en pratique mes connaissances
			avec les frameworks Vue.js et Laravel, ainsi qu'en bases de données MySQL. Cette expérience m'a permis
			d'allier créativité et maîtrise technique pour répondre aux besoins de mon client. &#128526;
		</p>

		<div class="ct-img opacity-0">
			<img alt="" class="reverse" height="38" src="@/assets/images/p-line.svg" width="364" />
		</div>

		<p class="f-medium jura opacity-0">
			Aujourd'hui, je suis à la recherche d'une alternance pour poursuivre mon parcours en bac+3 dès septembre.
			Passionné et autonome, je suis prêt à m'investir pleinement dans des projets stimulants, tout en continuant
			d'apprendre et de me perfectionner.
		</p>

		<img alt="" class="opacity-0" height="38" src="@/assets/images/p-line.svg" width="364" />

		<p class="f-medium jura left opacity-0">
			N'hésitez pas à me contacter pour échanger sur de nouvelles opportunités professionnelles ! &#128516;
		</p>

		<h3 class="chakra-petch opacity-0">Mon parcours</h3>

		<div class="list-path flex row a-center gap30 opacity-0">
			<div class="flex row a-center gap10 transition-all">
				<img alt="Logo diplôme national du brevet" height="200" src="@/assets/images/dnb.webp" width="200" />
				<div class="flex column">
					<h4 class="chakra-petch">Diplôme national du brevet</h4>
					<span class="jura">2021</span>
				</div>
			</div>

			<hr class="line" />

			<div class="flex row a-center gap10 transition-all">
				<img
					alt="Logo du site web abzaroke de Bertrand Montillet"
					height="200"
					src="@/assets/images/abzaroke.webp"
					width="200"
				/>
				<div class="flex column">
					<h4 class="chakra-petch">Creation du site web de Bertrand Montillet</h4>
					<span class="jura">2022 - 2023</span>
				</div>
			</div>

			<hr class="line" />

			<div class="flex row a-center gap10 transition-all">
				<img alt="Logo diplôme OpenClassrooms bac+2" height="200" src="@/assets/images/oc.webp" width="200" />
				<div class="flex column">
					<h4 class="chakra-petch">Formation Développeur Web Full-Stack (BAC +2)</h4>
					<span class="jura">2023</span>
				</div>
			</div>

			<hr class="line" />

			<div class="flex row a-center gap10 transition-all">
				<img alt="Logo diplôme OpenClassrooms bac+3" height="200" src="@/assets/images/oc.webp" width="200" />
				<div class="flex column">
					<h4 class="chakra-petch">Alternance Développeur Web React (BAC +3)</h4>
					<span class="jura">2023 - En cours</span>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var.scss';

	section {
		p {
			width: 50vw;
			margin-bottom: 10px;

			&.left {
				align-self: end;
			}
		}

		> img,
		.ct-img {
			width: 28vw;
			align-self: center;
			margin-right: 12vw;

			&.first {
				margin-right: 0;
			}

			.reverse {
				margin-left: 12vw;
				margin-right: 0;
				transform: scaleX(-1);
			}
		}

		h3 {
			font-size: 22px;
			margin: 20px 0 0 0;
		}

		.list-path {
			overflow-x: auto;
			max-width: 100%;

			&::-webkit-scrollbar {
				display: none;
			}

			hr {
				border: none;
				border-top: var(--dark-background-color) solid 1px;
				min-width: 2vw;
				height: min-content;
			}

			> div {
				height: 100%;
				max-width: 120px;
				min-width: 120px;
				overflow: hidden;
				max-height: 130px;
				background-color: var(--light-background-color);
				transition: all 500ms ease-in-out;
				border-radius: var(--main-border-radius);
				padding: 15px;
				cursor: pointer;

				h4,
				span {
					opacity: 0;
					transition: all 500ms ease-in-out;
				}

				img {
					width: 90px;
					height: auto;
					border-radius: var(--main-border-radius);
					filter: grayscale(50%);
				}

				h4 {
					font-size: 18px;
					color: white;
					min-width: 220px;
				}

				span {
					color: #dcdcdc;
				}

				&:hover {
					max-width: 350px;
					min-width: 350px;
					width: 350px;
					background-color: var(--dark-background-color);

					h4,
					span {
						opacity: 1;
					}
				}
			}
		}
	}

	@media (max-width: global_var.$mobile-width) {
		section {
			p {
				width: 70vw;
			}

			> img {
				width: 50vw;
			}

			.list-path {
				flex-direction: column;
				gap: 10px;

				hr {
					border: none;
					border-left: var(--dark-background-color) solid 1px;
					width: min-content;
					height: 4vh;
				}

				> div {
					max-width: 100%;
					min-width: 100%;

					h4,
					span {
						opacity: 1;
						color: black;
					}

					&:hover {
						background-color: var(--light-background-color);
						max-width: 100%;
						min-width: 100%;
					}
				}
			}
		}
	}
</style>
