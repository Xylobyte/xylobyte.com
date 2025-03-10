<script lang="ts" setup>
	import SectionTitleComponent from '@/components/home/SectionTitleComponent.vue';
	import ButtonComponent from '@/components/ButtonComponent.vue';
	import { AtSign, Phone } from 'lucide-vue-next';
	import { computed, reactive, ref } from 'vue';
	import LoaderComponent from '@/components/LoaderComponent.vue';
	import InputComponent from '@/components/InputComponent.vue';
	import { XylobyteAPI } from '@/api/XylobyteAPI.ts';

	const resetErrors = (value: boolean) => ({
		name: value,
		email: value,
		phone: value,
		message: value,
	});

	const otherError = ref(false);
	const loading = ref(false);
	const isOk = ref(false);
	const errors = ref(resetErrors(true));

	const form = reactive({
		name: '',
		email: '',
		phone: '',
		message: '',
	});

	const inputDisabled = computed(() => loading.value || isOk.value);

	const sendEmail = async () => {
		loading.value = true;
		otherError.value = false;
		try {
			await XylobyteAPI.sendContactRequest(form);
			isOk.value = true;
			errors.value = resetErrors(false);
		} catch (e) {
			console.error(e);
			otherError.value = true;
		}
		loading.value = false;
	};
</script>

<template>
	<section id="contact" class="adaptative-viewport-height flex column scroll-animate">
		<SectionTitleComponent title="Contact" />

		<div class="main-ct flex row a-center gap10">
			<form id="contact-form" :class="{ success: isOk }" class="flex column gap20" @submit.prevent="sendEmail()">
				<InputComponent
					v-model="form.name"
					:disabled="inputDisabled"
					:show-error="true"
					class="opacity-0"
					placeholder="Nom et prénom"
					validate-for="name"
					@valid="v => (errors.name = !!v)"
				/>
				<InputComponent
					v-model="form.email"
					:disabled="inputDisabled"
					:show-error="true"
					class="opacity-0"
					placeholder="Email"
					type="email"
					validate-for="email"
					@valid="v => (errors.email = !!v)"
				/>
				<InputComponent
					v-model="form.phone"
					:disabled="inputDisabled"
					:show-error="true"
					class="opacity-0"
					placeholder="Téléphone"
					type="tel"
					validate-for="phone"
					@valid="v => (errors.phone = !!v)"
				/>
				<InputComponent
					v-model="form.message"
					:disabled="inputDisabled"
					:show-error="true"
					class="opacity-0"
					placeholder="Message"
					type="textarea"
					validate-for="message"
					@valid="v => (errors.message = !!v)"
				/>

				<ButtonComponent
					:disabled="inputDisabled || !Object.values(errors).every(e => !e)"
					:icon="loading ? LoaderComponent : undefined"
					:text="isOk ? 'Demande envoyé !' : 'Envoyer'"
					background-color="102, 88, 185"
					class="btn-center opacity-0"
					color="255, 255, 255"
				/>
				<span v-if="otherError" class="other-error jura f-medium">
					Erreur, vérifiez les informations ou réessayez plus tard...
				</span>
			</form>

			<hr />

			<div class="contact-btn flex column a-center gap30">
				<ButtonComponent
					:icon="Phone"
					background-color="40, 40, 40"
					class="flex a-center j-center opacity-0"
					color="255, 255, 255"
					link="tel:+33749386838"
					text="07 49 38 68 38"
				/>
				<ButtonComponent
					:icon="AtSign"
					background-color="40, 40, 40"
					class="flex a-center j-center opacity-0"
					color="255, 255, 255"
					link="mailto:nantsamontillet@xylobyte.com"
					text="nantsamontillet@xylobyte.com"
				/>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	@use '@/assets/styles/global_var';

	.main-ct {
		margin-top: 50px;

		hr {
			width: auto;
			height: 50%;
			border: none;
			border-left: var(--dark-background-color) 1px solid;
			margin-left: 5vw;
		}

		> div {
			width: 50%;
		}
	}

	#contact-form {
		width: 50%;

		::v-deep(.btn-center) {
			align-self: center;
		}

		.other-error {
			color: red;
			align-self: center;
		}
	}

	@media (max-width: (global_var.$tablet-width - 150px)) {
		.main-ct {
			flex-direction: column;
			gap: 30px;
			margin-top: 30px;

			hr {
				margin-left: 0;
				height: auto;
				width: 80%;
				border: none;
				border-top: var(--dark-background-color) 1px solid;
			}

			> div {
				width: 100%;
				margin-bottom: 30px;
			}
		}

		#contact-form {
			width: 100%;
		}
	}
</style>
