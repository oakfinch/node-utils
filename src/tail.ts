import { spawn, ChildProcess } from 'child_process';

export const tail = (
  file: string,
  output?: typeof process.stdout,
): ChildProcess => {
  const child = spawn('tail', ['-n', '0', '-f', file]);

  if (output) {
    child.stdout.pipe(output);
  }

  process.on('beforeExit', () => {
    child.kill();
  });

  return child;
};

export default tail;
