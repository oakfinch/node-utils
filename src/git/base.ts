import type { ChildProcess } from 'child_process';
import { Command } from './types';
import { withDirFlag } from './with-dir-flag';
import { git } from './spawn-git';

export const clone = (
  remote: string,
  dest: string,
  ...args: string[]
): ChildProcess => git(Command.CLONE, ...args, remote, dest);

export const pull = withDirFlag(Command.PULL);
export const status = withDirFlag(Command.STATUS);
export const fetch = withDirFlag(Command.FETCH);
