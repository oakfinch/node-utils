import { spawn, ChildProcess } from 'child_process';
import { GIT_BIN } from './constants';

const bound = spawn.bind(null, GIT_BIN);

export const git = (...args: string[]): ChildProcess => bound(args, {});

export default git;
