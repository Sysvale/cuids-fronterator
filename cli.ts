#!/usr/bin/env node
import prompts from 'prompts';
import { scaffoldFeature, scaffoldDomain } from './src/scaffold.js';
import { DOMAIN_DIR, STUBS_DIR } from './src/paths.js';

export async function runCli() {
	const response = await prompts({
		type: 'text',
		name: 'entity',
		message: 'Nome da entidade (singular, PascalCase):',
		validate: value =>
			value.trim() === '' ? 'Nome da entidade não pode ser vazio' : true,
	});

	if (!response.entity) {
		console.log('Operação cancelada.');
		process.exit(0);
		return;
	}

	const projectRoot = process.cwd();

	const replacements = {
		ENTITY_CAPS: response.entity.toUpperCase(),
		ENTITY_CAPS_PLURAL: `${response.entity.toUpperCase()}S`,
		ENTITY: response.entity,
		ENTITY_PLURAL: `${response.entity}s`,
		entity: response.entity.toLowerCase(),
		entityPlural: `${response.entity.toLowerCase()}s`,
	};

	await scaffoldFeature(STUBS_DIR, projectRoot, replacements);
	await scaffoldDomain(DOMAIN_DIR, projectRoot, replacements);

	console.log(`Feature ${response.entity} inserida com sucesso!`);
}
