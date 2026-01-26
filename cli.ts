#!/usr/bin/env node
import prompts from 'prompts';
import { scaffoldFeature, scaffoldDomain } from './src/scaffold.js';
import { DOMAIN_DIR, STUBS_DIR } from './src/paths.js';
// @ts-ignore
import pluralize from 'pluralize';
import {
	pascalCase,
	camelCase,
	constantCase,
	kebabCase,
	// @ts-ignore
} from 'change-case';

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
	const singularKebab = kebabCase(response.entity).toLowerCase();
	const pluralKebab = kebabCase(pluralize(response.entity)).toLowerCase();
	const singularPascal = pascalCase(response.entity);
	const pluralPascal = pascalCase(pluralize(response.entity));
	const singularCamel = camelCase(response.entity);
	const pluralCamel = camelCase(pluralize(response.entity));

	const replacements = {
		ENTITY_CAPS: constantCase(singularPascal),
		ENTITY_CAPS_PLURAL: constantCase(pluralPascal),
		ENTITY: singularPascal,
		ENTITY_PLURAL: pluralPascal,
		entity: singularCamel,
		entityPlural: pluralCamel,
		entityKebab: singularKebab,
		entityKebabPlural: pluralKebab,
	};

	await scaffoldFeature(STUBS_DIR, projectRoot, replacements);
	await scaffoldDomain(DOMAIN_DIR, projectRoot, replacements);

	console.log(`Feature ${response.entity} inserida com sucesso!`);
}
