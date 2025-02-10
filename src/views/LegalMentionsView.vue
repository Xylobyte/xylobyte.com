<script setup lang="ts">
	import { onMounted } from 'vue';

	onMounted(() => {
		document.title = 'Nantsa Montillet - Mentions légales';
	});
</script>

<template>
	<div class="bg">
		<div class="mentions flex column jura gap10">
			<h2 class="chakra-petch">MENTIONS LÉGALES</h2>
			<p>
				Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie
				numérique, il est précisé aux utilisateurs du site Xylobyte l'identité des différents intervenants dans
				le cadre de sa réalisation et de son suivi.
			</p>
			<h3 class="chakra-petch">Edition du site</h3>
			<p>
				Le présent site, accessible à l’URL
				<a class="txt-link" href="https://xylobyte.com">https://xylobyte.com</a> (le « Site »), est édité par :
			</p>
			<p>
				Nantsa Montillet, résidant 2 chemin d'Ance 63680 Chastreix, de nationalité Française (France), né(e) le
				18/04/2006,
			</p>
			<h3 class="chakra-petch">Hébergement</h3>
			<p>
				Le Site est hébergé par la société Infomaniak, situé Rue Eugène-Marziano 25, 1227 Genève, Suisse,
				(contact téléphonique ou email : (+41) 22 820 35 44).
			</p>
			<h3 class="chakra-petch">Directeur de publication</h3>
			<p>Le Directeur de la publication du Site est Nantsa Montillet.</p>
			<h3 class="chakra-petch">Nous contacter</h3>
			<p>
				Par email&nbsp;:
				<a class="txt-link" href="mailto:nantsamontillet@xylobyte.com">nantsamontillet@xylobyte.com</a><br />
				Par courrier&nbsp;: 2 chemin d'Ance 63680 Chastreix
			</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.bg {
		background: white;
	}

	.mentions {
		min-height: 100vh;
		max-width: 800px;
		margin: 0 auto;
		padding: 80px 20px;
	}
</style>
