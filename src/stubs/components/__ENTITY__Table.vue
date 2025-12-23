<template>
	<CdsDataTable
		:fields="fields"
		:items="items"
		:total-items="meta.total"
		:loading
		:empty-src-img="emptySrcImg"
		:empty-title="emptyTitle"
		:empty-description="emptyDescription"
		class="table"
		hide-customize-button
	>
		<template
			#table-item="{ data, field }"
		>
			<CdsFlexbox
				v-if="field === 'actions'"
				:gap="2"
				justify="flex-end"
				align="center"
			>
				<CdsIconButton
					id="edit-button"
					size="sm"
					icon="edit-outline"
					:tooltip-text="'Editar'"
					@click="emits('edit-item', data)"
				/>
				<CdsIconButton
					id="delete-button"
					size="sm"
					icon="trash-outline"
					:tooltip-text="'Excluir'"
					@click="emits('delete-item', data)"
				/>
			</CdsFlexbox>
		</template>
	</CdsDataTable>
</template>
<script setup>
defineProps({
	items: {
		type: Array,
		default: () => ([]),
	},
	meta: {
		type: Object,
		default: () => ({}),
	},
	loading: {
		type: Boolean,
		default: false,
	},
	emptySrcImg: {
		type: String,
		default: '',
	},
	emptyTitle: {
		type: String,
		default: '',
	},
	emptyDescription: {
		type: String,
		default: '',
	},
});

const emits = defineEmits(['edit-item', 'delete-item']);

const fields = [
	{
		key: 'name',
		label: 'Nome'
	},
	{
		key: 'actions',
		label: '',
	},
];
</script>

<style lang="scss">

.table {
	&__actions {
		display: flex;
		justify-content: flex-end;
		gap: spacer(2);
	}
}
</style>
