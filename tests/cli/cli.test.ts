import { describe, it, expect, vi, type Mock } from 'vitest';
import prompts from 'prompts';
import { runCli } from '../../cli';
import { createTmpProject } from '../helpers/tmpDir';

vi.mock('prompts', () => ({
	default: vi.fn(),
}));

describe('CLI interactive', () => {
	it('uses prompt correctly', async () => {
		const originalCwd = process.cwd();
		const tmpProject = await createTmpProject();

		(prompts as unknown as Mock).mockResolvedValue({
			entity: 'User',
		});

		process.chdir(tmpProject);

		await runCli();

		expect(prompts).toHaveBeenCalledOnce();

		process.chdir(originalCwd);
		vi.clearAllMocks();
	});

	it('finishes correctly on empty prompt', async () => {
		const tmpProject = await createTmpProject();
		const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as (code?: string | number | null) => never);

		(prompts as unknown as Mock).mockResolvedValue({
			entity: null,
		});

		process.chdir(tmpProject);

		await runCli();

		expect(prompts).toHaveBeenCalledOnce();

		expect(mockExit).toHaveBeenCalledWith(0);
	})
});
