<template>
	<component
		:is="dialogComponent"
		v-model="internalShowModal"
		v-bind="$attrs"
		:title
		:action-button-variant="variant"
		:disable-ok-button="disabled || loading"
		:disable-cancel-button="disabled || loading"
		:ok-button-text="loading ? 'Carregando...' : 'Salvar'"
		no-close-on-backdrop
		no-close-button
		no-close-ok-button
		with-overlay
		block-ok-button
		cancel-button-text="Cancelar"
		@ok="handleSave"
	>
		<CdsSpacer
			v-if="errorMessage"
			:margin-bottom="4"
		>
			<CdsAlert
				variant="danger"
				:text="errorMessage"
			/>
		</CdsSpacer>
		<__ENTITY__Form
			ref="__entity__Form"
			v-model="__entity__"
			:disabled="loading"
		/>
	</component>
</template>
<script setup>
import __ENTITY__Form from './__ENTITY__Form.vue';
import { __ENTITY__ } from '../../../shared/domain/__entityPlural__';
import { ref, useTemplateRef, watch, computed } from 'vue';

const emits = defineEmits(['submit']);

const props = defineProps({
	title: {
		type: String,
		default: 'Adicionar item',
	},
	loading: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	modal: {
		type: Boolean,
		default: false,
	},
	errorMessage: {
		type: String,
		default: null,
	},
	variant: {
		type: String,
		default: 'green',
	}
});

const __entity__Form = useTemplateRef('__entity__Form');
const internalShowModal = defineModel({ type: Boolean, required: true });
const __entity__ = ref({});

const dialogComponent = computed(() => props.modal ? 'cds-modal' : 'cds-side-sheet');

watch(() => props.modelValue, (newValue) => {
	internalShowModal.value = newValue;
});

function handleSave() {
	__entity__Form.value.validate()
		.then((result) => {
			if (result.valid) {
				emits('submit', ((new __ENTITY__(__entity__Form.value.getValues())).asRequestPayload()));
			}
		});
}
</script>
