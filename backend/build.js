import { cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const backendDirectory = dirname(fileURLToPath(import.meta.url));
const sourceDirectory = join(backendDirectory, 'src');
const outputDirectory = join(backendDirectory, 'dist');

rmSync(outputDirectory, { recursive: true, force: true });
cpSync(sourceDirectory, outputDirectory, { recursive: true });
