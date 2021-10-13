import { spawn, SpawnOptions, ChildProcess } from 'child_process';
import { JAVA_BIN, JAVA_FLAGS } from './constants';
import { promisifyChildProcess as promisify } from '../process/promisify-child-process';

/**
 * runs a java `.jar` file
 * @param jar - the path to the jar file
 * @param flags - any flags to pass to the jar file
 * @param options - spawn options
 * @returns an object combining the child process that was spawned, and a
 *          promise that resolves to the string output to stdout.
 */
export const run: (
  jar: string,
  flags?: string[],
  options?: SpawnOptions
) => Promise<string> & ChildProcess = promisify((
  jar,
  flags: string[] = [],
  options = {},
) => spawn(JAVA_BIN, [...JAVA_FLAGS, jar, ...flags], options));

export default run;
