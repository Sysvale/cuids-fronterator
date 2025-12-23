import { describe, it, expect } from 'vitest';
import { execa } from 'execa';
import { createTmpProject } from '../helpers/tmpDir';
import { join } from 'node:path';

describe('CLI', () => {
	it('generates files when called with entity', async () => {
		const root = await createTmpProject();

		await execa(
			join(process.cwd(), 'dist/cli.js'),
			['User'],
			{ cwd: root }
		);


		const featurePath = join(
			root,
			'resources/js/features/users'
		);

		expect(featurePath).toBeDefined();
	});

	it('fails with no entity', async () => {
		await expect(
			execa('node', [join(process.cwd(), 'dist/cli.js')])
		).rejects.toThrow();
	});
});
