<script lang="ts" setup>
	import { type InputTypeHTMLAttribute, ref } from 'vue';

	const props = defineProps<{
		disabled?: boolean;
		readonly?: boolean;
		placeholder: string;
		type?: InputTypeHTMLAttribute | 'textarea';
		showError?: boolean;
		validateFor?: 'name' | 'email' | 'phone' | 'message';
	}>();

	const emit = defineEmits<{
		(e: 'blur', event: FocusEvent): void;
		(e: 'valid', valid: string | undefined): void;
	}>();

	const model = defineModel<string>();

	const error = ref('');

	const validate = (e: FocusEvent) => {
		emit('blur', e);

		switch (props.validateFor) {
			case 'name':
				error.value = (model.value?.length || 0) < 4 ? 'Minimum 4 caractère' : '';
				break;
			case 'email':
				error.value = !/^[a-zA-Z0-9.]{2,}@[-_a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(model.value || '')
					? 'Entrez un email valide'
					: '';
				break;
			case 'phone':
				error.value = !/^\+?[1-9]\d{0,2}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
					model.value || '',
				)
					? 'Entrez un numéro valide, il doit être au format international'
					: '';
				break;
			case 'message':
				error.value = (model.value?.length || 0) < 20 ? 'Minimum 4 caractère' : '';
				break;
		}

		emit('valid', error.value || undefined);
	};
</script>

<template>
	<div class="flex column gap5">
		<input
			v-if="props.type !== 'textarea'"
			v-model="model"
			:disabled="props.disabled"
			:placeholder="props.placeholder"
			:readonly="props.readonly || props.disabled"
			:type="props.type || 'text'"
			class="jura f-medium"
			@blur="validate"
		/>
		<textarea
			v-else
			v-model="model"
			:disabled="props.disabled || props.disabled"
			:placeholder="props.placeholder"
			:readonly="props.readonly"
			class="jura f-medium"
			@blur="validate"
		></textarea>

		<span v-if="error && props.showError" class="jura f-medium">{{ error }}</span>
	</div>
</template>

<style lang="scss" scoped>
	input,
	textarea {
		background-color: var(--light-background-color);
		border: none;
		border-radius: var(--main-border-radius);
		box-shadow: var(--small-shadow);
		padding: 15px;
		max-width: 100%;
		min-width: 100%;

		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}
	}

	textarea {
		height: 200px;
		resize: none;
	}

	span {
		color: red;
		margin-left: 10px;
	}
</style>
