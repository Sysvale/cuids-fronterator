import {
  mkdir,
  readdir,
  readFile,
  writeFile,
  stat,
  access,
} from 'node:fs/promises';
import { join } from 'node:path';

type Replacements = Record<string, string>;

export async function scaffoldFeature(
  stubsDir: string,
  projectRoot: string,
  replacements: Replacements
) {
  if (!replacements.entity) {
    throw new Error(
      'Missing required replacement: "entity" (lowercase entity name)'
    );
  }

  const targetRoot = join(
    projectRoot,
    'resources',
    'js',
    'features',
    replacements.entityPlural
  );

  await copyRecursive(stubsDir, targetRoot, replacements);
}

export async function scaffoldDomain(
  stubsDir: string,
  projectRoot: string,
  replacements: Replacements
) {
  if (!replacements.entity) {
    throw new Error(
      'Missing required replacement: "entity" (lowercase entity name)'
    );
  }

  const targetRoot = join(
    projectRoot,
    'resources',
    'js',
    'shared',
    'domain',
    replacements.entityPlural
  );

  await copyRecursive(join(stubsDir, 'domain'), targetRoot, replacements);
}

async function copyRecursive(
  sourceDir: string,
  targetDir: string,
  replacements: Replacements
) {
  await mkdir(targetDir, { recursive: true });

  const entries = await readdir(sourceDir);

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry);
    const outputName = replaceTokens(entry, replacements);
    const targetPath = join(targetDir, outputName);

    const entryStat = await stat(sourcePath);

    if (entryStat.isDirectory()) {
      await copyRecursive(sourcePath, targetPath, replacements);
      continue;
    }

    if (await exists(targetPath)) {
      throw new Error(`File already exists: ${targetPath}`);
    }

    const raw = await readFile(sourcePath, 'utf-8');
    const output = replaceTokens(raw, replacements);

    assertNoUnresolvedTokens(output, targetPath);

    await writeFile(targetPath, output, 'utf-8');
  }
}

function replaceTokens(input: string, replacements: Replacements) {
  let output = input;

  for (const [key, value] of Object.entries(replacements)) {
    output = output.replaceAll(`__${key}__`, value);
  }

  return output;
}

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function assertNoUnresolvedTokens(content: string, path: string) {
  if (/__\w+__/.test(content)) {
    throw new Error(`Unresolved token found in: ${path}`);
  }
}
