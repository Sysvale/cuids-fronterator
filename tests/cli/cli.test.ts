import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import prompts from 'prompts';
import { runCli } from '../../cli';
import { createTmpProject } from '../helpers/tmpDir';

vi.mock('prompts', () => ({
  default: vi.fn(),
}));

describe('CLI interactive', () => {
let originalCwd: string;

  beforeEach(() => {
    originalCwd = process.cwd();
  });

  afterEach(() => {
    process.chdir(originalCwd);
    vi.clearAllMocks();
  });

  it('uses prompt when entity is not provided', async () => {
	const tmpProject = await createTmpProject();

    (prompts as unknown as Mock).mockResolvedValue({
      entity: 'User',
    });

	process.chdir(tmpProject);

    await runCli(['node', 'cli.js']);

    expect(prompts).toHaveBeenCalledOnce();
  });
});
