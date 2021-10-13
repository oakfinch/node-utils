export const enum Status {
  UP_TO_DATE = 'up-to-date',
  BEHIND = 'behind',
  AHEAD = 'ahead',
  OUT_OF_SYNC = 'out-of-sync',
}

export const enum Command {
  'CLONE' = 'clone',
  'PULL' = 'pull',
  'FETCH' = 'fetch',
  'STATUS' = 'status',
}

/**
 * Resolved value of the promise returned by {@link git.status}
 *
 * @typedef StatusInfo
 * @property {string} branch - The current branch
 * @property {string} comparison - Full text of the comparison from `git status`'s output
 * @property {string} status - The current status
 * @property {boolean} "BEHIND" - True if the current status === "BEHIND"
 * @property {boolean} "AHEAD" - True if the current status === "AHEAD"
 * @property {boolean} "UP_TO_DATE" - True if the current status === "UP_TO_DATE"
 * @property {boolean} "OUT_OF_SYNC" - True if the current status === "OUT_OF_SYNC"
 */
export type StatusInfo<T extends Status = Status> = {
  branch: T extends Status.OUT_OF_SYNC ? (string | null | undefined) : string;
  comparison: T extends Status.OUT_OF_SYNC ? (string | null | undefined) : string;
  status: T;
  [Status.BEHIND]: T extends Status.BEHIND ? true : false;
  [Status.AHEAD]: T extends Status.AHEAD ? true : false;
  [Status.UP_TO_DATE]: T extends Status.UP_TO_DATE ? true : false;
  [Status.OUT_OF_SYNC]: T extends Status.OUT_OF_SYNC ? true : false;
};
