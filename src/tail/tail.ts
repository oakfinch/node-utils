import { spawn, ChildProcess } from 'child_process';
import { EVENTS } from '../process/constants';
import { LINES_FLAG, FILE_FLAG, TAIL_BIN } from './constants';

/**
 * Follow a file using `tail`
 *
 * @param file - the file to follow
 * @param options.lines - how many lines back to start
 * @param options.output - a stream to pipe the output to
 * @returns
 */
export const tail = (
  file: string,
  {
    lines = 0,
    output,
  }: { lines: number, output?: typeof process.stdout },
): ChildProcess => {
  const child = spawn(TAIL_BIN, [LINES_FLAG, String(lines), FILE_FLAG, file]);

  if (output) {
    child.stdout.pipe(output);
  }

  process.on(EVENTS.BEFORE_EXIT, () => {
    child.kill();
  });

  return child;
};

export default tail;
