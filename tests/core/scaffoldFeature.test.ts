import { describe, it, expect } from 'vitest';
import { scaffoldFeature } from '../../src/scaffold';
import { createTmpProject } from '../helpers/tmpDir';
import { join } from 'node:path';
import { STUBS_DIR } from '../../src/paths';
import { readdir } from 'node:fs/promises';

describe('scaffoldFeature', () => {
	it('creates feature structure under resources/js/features', async () => {
		const root = await createTmpProject();

		await scaffoldFeature(
			STUBS_DIR,
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

		const target = join(
			root,
			'resources',
			'js',
			'features',
			'users'
		);

		const entries = await readdir(target);

		expect(entries).toContain('components');
		expect(entries).toContain('pages');
		expect(entries).toContain('routes');

		expect(entries).not.toContain('index.ts');
		expect(entries).not.toContain('pageSettings.ts');
		expect(entries).not.toContain('user.model.ts');
	});

	it('throws if entity is missing', async () => {
		const root = await createTmpProject();

		await expect(
			scaffoldFeature(
				STUBS_DIR,
				root,
				{}
			)
		).rejects.toThrow('Missing required replacement');
	});
});
