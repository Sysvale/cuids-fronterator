<template>
	<show-form
		ref="__entity__FormValidationProvider"
		:initial-values="__entity__"
	>
		<CdsGrid
			:cols="12"
			:col-gap="4"
			:row-gap="2"
		>
			<CdsGridItem
				v-for="formField in __entity__FormFields"
				:key="formField.name"
				:col-span="formField.colSpan"
			>
				<show-field
					v-slot="{
						field
					}"
					v-bind="formField"
				>
					<component
						:is="formField.component"
						v-bind="{
							...field,
							...formField,
						}"
						:disabled="disabled"
					/>
				</show-field>
			</CdsGridItem>
		</CdsGrid>
	</show-form>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import __entity__FormFields from '../constants/__entity__FormFields';

defineProps({
	disabled: {
		type: Boolean,
		default: false,
	},
});

const __entity__ = defineModel({ type: Object, default: () => ({}) });
const __entity__FormValidationProvider = ref(null);

onMounted(() => {
	__entity__.value = {};
	__entity__FormValidationProvider.value.resetForm({
		values: __entity__.value,
	});
});

defineExpose({
	validate: () => __entity__FormValidationProvider.value.validate(),
	getValues: () => __entity__FormValidationProvider.value.getValues(),
});
</script>
