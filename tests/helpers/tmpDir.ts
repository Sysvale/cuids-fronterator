import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export async function createTmpProject() {
	const root = await mkdtemp(join(tmpdir(), 'cuids-generator-'));
	const routesDir = join(root, 'resources', 'js', 'core', 'routes');

	await mkdir(routesDir, { recursive: true });

	await writeFile(
		join(routesDir, 'index.js'),
		`/** @cuids-generator:routes:import */

		const routes = {
			/** @cuids-generator:routes:register */
		};

		export default routes;
		`,
		'utf-8',
	);

	return root;
}
