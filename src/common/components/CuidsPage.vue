<template>
	<div class="page__container">
		<CdsPageHeader
			:title="pageSettings.pageTitle"
			:subtitle="pageSettings.pageSubtitle"
		>
			<template
				#aside
			>
				<CdsButton
					:text="pageSettings.addItemButtonText"
					:variant="pageSettings.variant"
					@click="emits('add-item')"
				/>
			</template>
		</CdsPageHeader>
		<div>
			<ShowRequestProvider
				v-slot="createRequestProps"
				v-bind="createRequestConfig"
				ref="createProvider"
				:service="service.create"
				hide-error-feedback
				@success="handleSuccess('create')"
			>
				<slot
					:loading="createRequestProps.loading"
					:error="createRequestProps.error"
					:error-message="createRequestProps.errorMessage"
					:action="createRequestProps.action"
					name="create"
				/>
			</ShowRequestProvider>
			<ShowRequestProvider
				v-slot="updateRequestProps"
				v-bind="updateRequestConfig"
				ref="updateProvider"
				:service="service.update"
				hide-error-feedback
				@success="handleSuccess('update')"
			>
				<slot
					:loading="updateRequestProps.loading"
					:error="updateRequestProps.error"
					:error-message="updateRequestProps.errorMessage"
					:action="updateRequestProps.action"
					name="update"
				/>
			</ShowRequestProvider>
			<ShowRequestProvider
				v-slot="indexRequestProps"
				v-bind="indexRequestConfig"
				ref="indexProvider"
				:service="service.index"
				:initial-data="{ data: [], meta: {} }"
				immediate
			>
				<CdsSpacer :margin-top="10">
					<slot
						:response="indexRequestProps.data"
						:loading="indexRequestProps.loading"
						name="index"
					/>
				</CdsSpacer>
			</ShowRequestProvider>
		</div>
	</div>
</template>
<script setup>
import { useTemplateRef } from 'vue';
import { useRequest } from '@sysvale/show';

const props = defineProps({
	service: {
		required: true,
		type: [Object, Function],
	},
	pageSettings: {
		type: Object,
		default: () => ({}),
	},
	createRequestConfig: {
		type: Object,
		default: () => ({}),
	},
	updateRequestConfig: {
		type: Object,
		default: () => ({}),
	},
	indexRequestConfig: {
		type: Object,
		default: () => ({}),
	},
	deleteRequestConfig: {
		type: Object,
		default: () => ({}),
	},
});

const emits = defineEmits(['add-item', 'sucess', 'error']);

const indexProvider = useTemplateRef('indexProvider');
const createProvider = useTemplateRef('createProvider');
const updateProvider = useTemplateRef('updateProvider');

const { action: deleteAction } = useRequest(props.service.delete);

function handleSuccess(action) {
	emits('success', action);
	indexProvider.value.action();
}

defineExpose({
	indexAction: (params) => indexProvider.value?.action(params),
	deleteAction: (payload) => new Promise((resolve) => {
		deleteAction(typeof payload === 'string' ? { id: payload } : payload)
			.then(() => {
				handleSuccess('delete');
				resolve();
			})
			.catch((error) => {
				emits('error', error);
			});
	}),
	createAction: (payload) => createProvider.value?.action(payload),
	updateAction: (payload) => updateProvider.value?.action(payload),
});
</script>

<style lang="scss" scoped>
.page {
	&__container {
		max-width: 100%;
	}
}
</style>
