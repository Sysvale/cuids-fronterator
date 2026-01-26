export const routes = {
	INDEX___ENTITY_CAPS_PLURAL__: {
		label: 'Itens',
		name: 'index-__entityKebabPlural__',
		path: '/__entityKebabPlural__',
		components: {
			default: () => import('../pages/__ENTITY_PLURAL__Page.vue')
		},
		meta: {
			title: 'Itens',
			description: 'Itens',
		},
	},
};

export default routes;
