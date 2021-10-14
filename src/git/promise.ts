import type { ChildProcess } from 'child_process';
import { isIncluded } from '@oakfinch/ts-utils';
import flow from 'lodash/flow';
import { promisifyChildProcess as promisify } from '../process/promisify-child-process';
import * as base from './base';
import { REGEX } from './constants';
import { StatusInfo, Status } from './types';

const statuses = [
  Status.UP_TO_DATE,
  Status.BEHIND,
  Status.AHEAD,
  Status.OUT_OF_SYNC,
] as const;

/**
 * executes `git clone`
 * @param remote - the remote repository to clone
 * @param dest - local path to clone the repository into
 * @param args - additional arguments to pass to `git clone`
 * @returns an object combining the child process that was spawned, and a
 *          promise that resolves to the string output to stdout.
 */
export const clone: (
  remote: string,
  dest: string,
  ...args: string[]
) => Promise<string> & ChildProcess = promisify(base.clone);

/**
 * executes `git pull`
 * @param dir - the local path to the git repository
 * @param args - additional arguments to pass to `git pull`
 * @returns an object combining the child process that was spawned, and a
 *          promise that resolves to the string output to stdout.
 */
export const pull: (
  dir: string,
  ...args: string[]
) => Promise<string> & ChildProcess = promisify(base.pull);

/**
 * executes `git fetch`
 * @param dir - the local path to the git repository
 * @param args - additional arguments to pass to `git fetch`
 * @returns an object combining the child process that was spawned, and a
 *          promise that resolves to the string output to stdout.
 */
export const fetch: (
  dir: string,
  ...args: string[]
) => Promise<string> & ChildProcess = promisify(base.fetch);

/**
 * executes `git status`
 * @param dir - the local path to the git repository
 * @param args - additional arguments to pass to `git status`
 * @returns an object combining the child process that was spawned, and a
 *          promise that resolves to information about the repository's status.
 */
export const status: (
  dir: string,
  ...args: string[]
) => Promise<StatusInfo> & ChildProcess = flow(
  promisify(base.status),
  // transform the resolved value of `git status` into something more useful
  // than just the string from stdout
  (childProcessPromise) => ({
    prev: childProcessPromise,
    next: childProcessPromise
      .then((result) => result.split('\n'))
      .then(([onBranch, comparison]) => [REGEX.ON_BRANCH.exec(onBranch)?.[1], comparison])
      .then(([branch, comparison]) => ({
        branch,
        comparison,
        ...statuses.reduce(
          (acc, key) => ({
            ...acc,
            [key]: (!!branch || key === Status.OUT_OF_SYNC)
              && !isIncluded(true, Object.values(acc))
              && REGEX[key].test(comparison ?? ''),
          }),
          {} as Pick<StatusInfo, Status>,
        ),
      }))
      .then((result) => ({
        ...result,
        status: statuses.find((name) => result[name]),
      }) as StatusInfo),
  }),
  ({ prev, next }) => Object.assign(prev, {
    then: next.then.bind(next),
    catch: next.catch.bind(next),
    finally: next.finally?.bind(next),
  }),
);
