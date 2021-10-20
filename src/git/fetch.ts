import type { ChildProcess } from 'child_process';
import { spawn } from '../process/spawn';
import { Command } from './types';
import { GIT_BIN, DIR_FLAG } from './constants';

/**
 * executes `git fetch`
 * @param dir - the local path to the git repository
 * @param args - additional arguments to pass to `git fetch`
 * @returns an object combining the child process that was spawned, and a
 *          promise that resolves to the string output to stdout.
 */
export const fetch = (
  dir: string,
  ...args: string[]
): Promise<string> & ChildProcess => spawn(
  GIT_BIN,
  [Command.FETCH, DIR_FLAG, dir, ...args],
);

export default fetch;
