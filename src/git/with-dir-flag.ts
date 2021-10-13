import { ChildProcess } from 'child_process';
import { DIR_FLAG } from './constants';
import { git } from './spawn-git';

export const withDirFlag: (command: string) => (dir: string, ...args: string[]) => ChildProcess = (
  (command) => (dir, ...args) => git(DIR_FLAG, dir, command, ...args)
);

export default withDirFlag;
