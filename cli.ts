#!/usr/bin/env node
import prompts from 'prompts';
import { scaffoldFeature, scaffoldDomain } from './src/scaffold.js';
import { DOMAIN_DIR, STUBS_DIR } from './src/paths.js';

export async function runCli(argv = process.argv) {
	const argEntity = argv[2];

	let entity = argEntity;

	if (!entity) {
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
		}

		entity = response.entity;
	}

	const projectRoot = process.cwd();

	const replacements = {
		ENTITY_CAPS: entity.toUpperCase(),
		ENTITY_CAPS_PLURAL: `${entity.toUpperCase()}S`,
		ENTITY: entity,
		ENTITY_PLURAL: `${entity}s`,
		entity: entity.toLowerCase(),
		entityPlural: `${entity.toLowerCase()}s`,
	};

	await scaffoldFeature(STUBS_DIR, projectRoot, replacements);
	await scaffoldDomain(DOMAIN_DIR, projectRoot, replacements);

	console.log(`Feature ${entity} inserida com sucesso!`);
}

 await runCli();
