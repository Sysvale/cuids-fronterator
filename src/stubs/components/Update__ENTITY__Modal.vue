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
		<__ENTITY__Form
			ref="__entity__Form"
			v-model="__entity__"
			:disabled="loading"
		/>
	</component>
</template>
<script setup>
import { ref, useTemplateRef, watch, computed } from 'vue';
import __ENTITY__Form from './__ENTITY__Form.vue';
import { __ENTITY__ } from '../../../shared/domain/__entityPlural__';

const emit = defineEmits(['close', 'submit']);

const props = defineProps({
	loading: {
		type: Boolean,
		default: false,
	},
	selectedItem: {
		type: Object,
		required: true,
	},
	title: {
		type: String,
		default: 'Editar item',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	modal: {
		type: Boolean,
		default: false,
	},
	variant: {
		type: String,
		default: 'green',
	},
});

const internalShowModal = defineModel({
	type: Boolean,
	default: false,
});

const __entity__ = ref({});
const __entity__Form = useTemplateRef('__entity__Form');

const dialogComponent = computed(() => props.modal ? 'cds-modal' : 'cds-side-sheet');

watch(() => props.selectedItem, (newValue) => __entity__.value = { ...newValue });
watch(() => internalShowModal, (newValue) => {
	if (newValue) return;

	emit('close');
});

function handleSave() {
	__entity__Form.value.validate()
		.then((result) => {
			if(result.valid) {
				emit('submit', (new __ENTITY__(__entity__Form.value.getValues()).asRequestPayload()));
			}
		});
}
</script>
