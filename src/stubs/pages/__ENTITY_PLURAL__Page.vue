<template>
	<CuidsPage
		ref="__entityPlural__Page"
		:page-settings="pageSettings"
		:service="__ENTITY__Service"
		@add-item="showCreate__ENTITY__Modal = true"
		@success="handleSuccess"
		@error="handleError"
	>
		<template #create="{ loading, error, errorMessage, action }">
			<Create__ENTITY__Modal
				v-model="showCreate__ENTITY__Modal"
				:loading="loading"
				:title="pageSettings.createModalTitle"
				:error-message="error ? errorMessage : null"
				:variant="pageSettings.variant"
				@submit="action"
			/>
		</template>
		<template #update="{ loading, error, errorMessage, action }">
			<Update__ENTITY__Modal
				v-model="showUpdate__ENTITY__Modal"
				:selected-item="selectedItem"
				:loading="loading"
				:title="pageSettings.updateModalTitle"
				:error-message="error ? errorMessage : null"
				:variant="pageSettings.variant"
				@submit="action"
				@close="selectedItem = new __ENTITY__()"
			/>
		</template>
		<template #index="{ response, loading }">
			<__ENTITY__Table
				:items="response.data"
				:meta="response.meta"
				:loading
				:empty-src-img="pageSettings.emptyStateImage"
				:empty-title="pageSettings.emptyStateTitle"
				:empty-description="pageSettings.emptyStateText"
				@edit-item="handleUpdateItemClick"
				@delete-item="handleDeleteItemClick"
			/>
			<CdsSpacer
				v-if="response.meta.total > response.meta.perPage"
				:margin-top="4"
			>
				<CdsPagination
					:model-value="response.meta.currentPage"
					:total="response.meta.total"
					:per-page="response.meta.perPage"
					:variant="pageSettings.variant"
					fluid
					@update:model-value="handlePageChange"
				/>
			</CdsSpacer>
		</template>
	</CuidsPage>
</template>
<script setup>
import { inject, ref, useTemplateRef } from 'vue';
import { useDialog } from '@sysvale/show';
import { __ENTITY__Service, __ENTITY__, __ENTITY_PLURAL__PageSettings } from '../../../shared/domain/__entityPlural__/index';
import { CuidsPage } from '@sysvale/cuids-generator';
import __ENTITY__Table from '../components/__ENTITY__Table.vue';
import Create__ENTITY__Modal from '../components/Create__ENTITY__Modal.vue';
import Update__ENTITY__Modal from '../components/Update__ENTITY__Modal.vue';

const useToast = inject('useToast');

const selectedItem = ref(new __ENTITY__());
const showCreate__ENTITY__Modal = ref(false);
const showUpdate__ENTITY__Modal = ref(false);
const pageSettings = ref(new __ENTITY_PLURAL__PageSettings());
const dialog = useDialog();
const __entityPlural__Page = useTemplateRef('__entityPlural__Page');

function handleUpdateItemClick(item) {
	selectedItem.value = item;
	showUpdate__ENTITY__Modal.value = true;
}

function handleDeleteItemClick(item) {
	dialog.show({
		title: pageSettings.value.deleteConfirmationTitle,
		description: pageSettings.value.deleteConfirmationText,
		okButtonText: 'Sim, excluir',
		actionButtonVariant: 'red',
		onOk: () => {
			__entityPlural__Page.value.deleteAction(item.id);
		},
	});
}

function handleError() {
	dialog.show({
		title: 'Erro ao realizar operação',
		description: 'Por favor, tente novamente. Caso o problema persista, entre em contato com o suporte.',
		okButtonText: 'Voltar',
		variant: 'error',
		actionButtonVariant: 'red',
	});
}

function handleSuccess(action) {
	showCreate__ENTITY__Modal.value = false;
	showUpdate__ENTITY__Modal.value = false;

	useToast().fire({
		title: pageSettings.value[`${action}SuccessFeedbackTitle`],
		description: pageSettings.value[`${action}SuccessFeedbackText`],
		variant: 'success',
	});
}

function handlePageChange(page) {
	__entityPlural__Page.value.indexAction({ page });
}
</script>
