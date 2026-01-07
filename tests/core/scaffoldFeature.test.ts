import { describe, it, expect } from 'vitest';
import { scaffoldFeature } from '../../src/scaffold';
import { createTmpProject } from '../helpers/tmpDir';
import { join } from 'node:path';
import { STUBS_DIR } from '../../src/paths';
import { readdir, readFile } from 'node:fs/promises';

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

		const routesIndexPath =join(
			root,
			'resources',
			'js',
			'core',
			'routes',
			'index.js',
		);

		const routesIndex = await readFile(routesIndexPath, 'utf-8');

		expect(routesIndex).toContain(
			`import userRoutes from '../../features/users/routes';`
		);

		expect(routesIndex).toContain(
			`...userRoutes,`
		);
	});
});
