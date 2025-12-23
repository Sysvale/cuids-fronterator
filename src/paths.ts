import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const STUBS_DIR = join(__dirname, 'stubs/');
export const DOMAIN_DIR = __dirname;
