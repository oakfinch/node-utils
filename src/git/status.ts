import type { ChildProcess } from 'child_process';
import { spawn } from '../process/spawn';
import { StatusInfo, Status, Command } from './types';
import {
  GIT_BIN, DIR_FLAG, REGEX, STATUSES,
} from './constants';

/**
 * executes `git status`
 * @param dir - the local path to the git repository
 * @param args - additional arguments to pass to `git status`
 * @returns an object combining the child process that was spawned, and a
 *          promise that resolves to information about the repository's status.
 */
export const status = (
  dir: string,
  ...args: string[]
): Promise<StatusInfo> & ChildProcess => {
  const child = spawn(
    GIT_BIN,
    [Command.FETCH, DIR_FLAG, dir, ...args],
  );

  // transform the resolved value of `git status` into something more useful
  // than just the string from stdout
  const next = (async () => {
    const [onBranch, comparison] = (await child).split('\n');
    const branch = REGEX.ON_BRANCH.exec(onBranch)?.[1];
    const currentStatus = STATUSES.find(
      (key) => REGEX?.[key].test(comparison ?? ''),
    ) ?? Status.OUT_OF_SYNC;

    return {
      branch,
      status: currentStatus,
      comparison,
      ...Object.fromEntries(
        STATUSES.map((key) => [key, currentStatus === key]),
      ),
    } as StatusInfo;
  })();

  // re-wrap
  return Object.assign(child, {
    then: next.then.bind(next),
    catch: next.catch.bind(next),
    finally: next.finally?.bind(next),
  });
};

export default status;
