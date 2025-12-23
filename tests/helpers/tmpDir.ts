import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export async function createTmpProject() {
  return mkdtemp(join(tmpdir(), 'cuids-generator-'));
}
