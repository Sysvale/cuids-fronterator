import { describe, it, expect } from 'vitest';
import { scaffoldDomain } from '../../src/scaffold';
import { DOMAIN_DIR } from '../../src/paths';
import { createTmpProject } from '../helpers/tmpDir';
import { join } from 'node:path';
import { readdir, readFile } from 'node:fs/promises';

describe('scaffoldDomain', () => {
	it('copies only the domain stubs into shared domain path', async () => {
		const root = await createTmpProject();

		await scaffoldDomain(
			DOMAIN_DIR,
			root,
			{
				ENTITY: 'User',
				ENTITY_PLURAL: 'Users',
				ENTITY_CAPS: 'USER',
				ENTITY_CAPS_PLURAL: 'USERS',
				entity: 'user',
				entityPlural: 'users',
			}
		);

		const domainRoot = join(
			root,
			'resources',
			'js',
			'shared',
			'domain',
			'users'
		);

		const entries = await readdir(domainRoot);

		expect(entries).toContain('index.ts');
		expect(entries).toContain('pageSettings.ts');
		expect(entries).toContain('user.model.ts');

		expect(entries).not.toContain('components');
		expect(entries).not.toContain('pages');
	});

	it('replaces tokens in domain file contents', async () => {
		const root = await createTmpProject();

		await scaffoldDomain(
			DOMAIN_DIR,
			root,
			{
				ENTITY: 'Product',
				ENTITY_PLURAL: 'Products',
				ENTITY_CAPS: 'PRODUCT',
				ENTITY_CAPS_PLURAL: 'PRODUCTS',
				entity: 'product',
				entityPlural: 'products',
			}
		);

		const modelPath = join(
			root,
			'resources',
			'js',
			'shared',
			'domain',
			'products',
			'product.model.ts'
		);

		const content = await readFile(modelPath, 'utf-8');

		expect(content).toContain('Product');
		expect(content).not.toMatch(/__\w+__/);
	});

	it('throws if entity replacement is missing', async () => {
		const root = await createTmpProject();

		await expect(
			scaffoldDomain(DOMAIN_DIR, root, {})
		).rejects.toThrow('Missing required replacement');
	});
});
