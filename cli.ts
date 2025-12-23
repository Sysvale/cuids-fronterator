#!/usr/bin/env node
import { scaffoldFeature, scaffoldDomain } from './src/scaffold.js';
import { DOMAIN_DIR, STUBS_DIR } from './src/paths.js';

const entity = process.argv[2];

if (!entity) {
	console.error('Uso: cuids-generator <NomeDaEntidade>');
	process.exit(1);
}

const projectRoot = process.cwd();

await scaffoldFeature(STUBS_DIR, projectRoot, {
	ENTITY_CAPS: entity.toUpperCase(),
	ENTITY_CAPS_PLURAL: `${entity.toUpperCase()}S`,
	ENTITY: entity,
	ENTITY_PLURAL: `${entity}s`,
	entity: entity.toLowerCase(),
	entityPlural: `${entity.toLowerCase()}s`,
});

await scaffoldDomain(DOMAIN_DIR, projectRoot, {
	ENTITY_CAPS: entity.toUpperCase(),
	ENTITY_CAPS_PLURAL: `${entity.toUpperCase()}S`,
	ENTITY: entity,
	ENTITY_PLURAL: `${entity}s`,
	entity: entity.toLowerCase(),
	entityPlural: `${entity.toLowerCase()}s`,
});
