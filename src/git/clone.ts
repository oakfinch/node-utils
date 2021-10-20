import type { ChildProcess } from 'child_process';
import { spawn } from '../process/spawn';
import { Command } from './types';
import { GIT_BIN } from './constants';

/**
 * executes `git clone`
 * @param remote - the remote repository to clone
 * @param dest - local path to clone the repository into
 * @param args - additional arguments to pass to `git clone`
 * @returns an object combining the child process that was spawned, and a
 *          promise that resolves to the string output to stdout.
 */
export const clone = (
  remote: string,
  dest: string,
  ...args: string[]
): Promise<string> & ChildProcess => spawn(
  GIT_BIN,
  [Command.CLONE, ...args, remote, dest],
);

export default clone;
