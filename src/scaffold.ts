import {
	mkdir,
	readdir,
	readFile,
	writeFile,
	stat,
	access,
} from 'node:fs/promises';
import { join } from 'node:path';

type Replacements = Record<string, string>;

export async function scaffoldFeature(
	stubsDir: string,
	projectRoot: string,
	replacements: Replacements
) {
	const targetRoot = join(
		projectRoot,
		'resources',
		'js',
		'features',
		replacements.entityPlural
	);

	await copyRecursive(stubsDir, targetRoot, replacements);

	await registerFeatureRoutes(projectRoot, replacements);
}

export async function scaffoldDomain(
	stubsDir: string,
	projectRoot: string,
	replacements: Replacements
) {
	const targetRoot = join(
		projectRoot,
		'resources',
		'js',
		'shared',
		'domain',
		replacements.entityPlural
	);

	await copyRecursive(join(stubsDir, 'domain'), targetRoot, replacements);
}

async function copyRecursive(
	sourceDir: string,
	targetDir: string,
	replacements: Replacements
) {
	await mkdir(targetDir, { recursive: true });

	const entries = await readdir(sourceDir);

	for (const entry of entries) {
		const sourcePath = join(sourceDir, entry);
		const outputName = replaceTokens(entry, replacements);
		const targetPath = join(targetDir, outputName);

		const entryStat = await stat(sourcePath);

		if (entryStat.isDirectory()) {
			await copyRecursive(sourcePath, targetPath, replacements);
			continue;
		}

		if (await exists(targetPath)) {
			throw new Error(`File already exists: ${targetPath}`);
		}

		const raw = await readFile(sourcePath, 'utf-8');
		const output = replaceTokens(raw, replacements);

		assertNoUnresolvedTokens(output, targetPath);

		await writeFile(targetPath, output, 'utf-8');
	}
}

function replaceTokens(input: string, replacements: Replacements) {
	let output = input;

	for (const [key, value] of Object.entries(replacements)) {
		output = output.replaceAll(`__${key}__`, value);
	}

	return output;
}

async function exists(path: string) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

function assertNoUnresolvedTokens(content: string, path: string) {
	if (/__\w+__/.test(content)) {
		throw new Error(`Unresolved token found in: ${path}`);
	}
}

async function registerFeatureRoutes(
	projectRoot: string,
	replacements: Replacements
) {
	const routesIndexPath = join(
		projectRoot,
		'resources',
		'js',
		'core',
		'routes',
		'index.js'
	);

	const importName = `${replacements.entity}Routes`;

	await injectImport(
		routesIndexPath,
		'/** @cuids-generator:routes:import */',
		`import ${importName} from '../../features/${replacements.entityPlural}/routes';`
	);

	await injectObjectEntry(
		routesIndexPath,
		'/** @cuids-generator:routes:register */',
		`...${importName},`
	);
}

async function injectImport(
	filePath: string,
	marker: string,
	importStatement: string
) {
	const file = await readFile(filePath, 'utf-8');

	if (!file.includes(marker)) {
		throw new Error(`Marcador "${marker}" não encontrado em ${filePath}`);
	}

	if (file.includes(importStatement)) {
		return;
	}

	const updated = file.replace(
		marker,
		`${marker}\n${importStatement}`
	);

	await writeFile(filePath, updated, 'utf-8');
}

async function injectObjectEntry(
	filePath: string,
	marker: string,
	entry: string
) {
	const file = await readFile(filePath, 'utf-8');

	if (!file.includes(marker)) {
		throw new Error(`Marcador "${marker}" não encontrado em ${filePath}`);
	}

	if (file.includes(entry)) {
		return;
	}

	const updated = file.replace(
		marker,
		`${marker}\n\t${entry}`
	);

	await writeFile(filePath, updated, 'utf-8');
}

