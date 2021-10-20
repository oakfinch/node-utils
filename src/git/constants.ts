import { Status } from './types';

export const GIT_BIN = 'git' as const;
export const DIR_FLAG = '-C' as const;

/** @constant */
export const REGEX = {
  ON_BRANCH: /on branch (.*)/i,
  COMPARISON: /your branch is (.*) '(.*)'( .*)?/i,
  [Status.BEHIND]: /your branch is behind/i,
  [Status.AHEAD]: /Your branch is ahead of/i,
  [Status.UP_TO_DATE]: /Your branch is up to date with/i,
  [Status.OUT_OF_SYNC]: /.*/i,
} as const;

export const STATUSES = [
  Status.UP_TO_DATE,
  Status.BEHIND,
  Status.AHEAD,
  Status.OUT_OF_SYNC,
] as const;
