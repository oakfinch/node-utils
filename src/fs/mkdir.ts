import {
  mkdir as mkdirCb, mkdirSync as nodeMkdirSync, PathLike, MakeDirectoryOptions,
} from 'fs';
import { promisify } from '@oakfinch/ts-utils';

/**
 * Asynchronously creates a directory.
 *
 * The optional `options` argument can be an integer specifying `mode`
 * (permission and sticky bits), or an object with a `mode` property and a
 * `recursive`property indicating whether parent directories should be created.
 * Calling `mkdir` when `path` is a directory that exists results in an error
 * only when `recursive` is false.
 *
 * ```js
 * import { mkdir } from '@oakfinch/node-utils/fs';
 *
 * // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
 * await mkdir('/tmp/a/apple', { recursive: true });
 * ```
 *
 * On Windows, using `mkdir` on the root directory even with recursion will
 * result in an error:
 *
 * ```js
 * import { mkdir } from '@oakfinch/node-utils/fs';
 *
 * // throws Error: EPERM: operation not permitted, mkdir 'C:\'
 * await mkdir('/', { recursive: true });
 * ```
 */
export const mkdir = promisify<[path: PathLike, options?: MakeDirectoryOptions]>(mkdirCb);

/**
 * Synchronously creates a directory.
 *
 * For detailed information, see the documentation of the asynchronous version
 * of this API: {@link mkdir}
 */
export const mkdirSync = nodeMkdirSync;

export default mkdir;
