import { describe, it, expect, vi, type Mock } from 'vitest';
import prompts from 'prompts';
import { runCli } from '../../cli';
import { createTmpProject } from '../helpers/tmpDir';

vi.mock('prompts', () => ({
	default: vi.fn(),
}));

describe('CLI interactive', () => {
	it('uses prompt when entity is not provided', async () => {
		const originalCwd = process.cwd();
		const tmpProject = await createTmpProject();

		(prompts as unknown as Mock).mockResolvedValue({
			entity: 'User',
		});

		process.chdir(tmpProject);

		await runCli(['node', 'cli.js']);

		expect(prompts).toHaveBeenCalledOnce();

		process.chdir(originalCwd);
		vi.clearAllMocks();
	});
});
