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
		const mockConsoleLog = vi.fn();
		console.log = mockConsoleLog;

		(prompts as unknown as Mock).mockResolvedValue({
			entity: 'UserCategory',
		});

		process.chdir(tmpProject);

		await runCli();

		expect(prompts).toHaveBeenCalledOnce();
		expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Feature UserCategory inserida com sucesso!'));

		process.chdir(originalCwd);
		vi.clearAllMocks();
	});

	it('finishes correctly on empty prompt', async () => {
		const tmpProject = await createTmpProject();
		const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as (code?: string | number | null) => never);
		const mockConsoleLog = vi.fn();
		console.log = mockConsoleLog;

		(prompts as unknown as Mock).mockResolvedValue({
			entity: null,
		});

		process.chdir(tmpProject);

		await runCli();

		expect(prompts).toHaveBeenCalledOnce();
		expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Operação cancelada.'));
		expect(mockExit).toHaveBeenCalledWith(0);
	})
});
