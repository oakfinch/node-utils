import {
  access as accessCallback, existsSync as nodeExistsSync, constants, PathLike,
} from 'fs';
import { promisify, hasProperty } from '@oakfinch/ts-utils';
import { ERRORS } from './constants';

const access = promisify<[path: PathLike, mode?: number | undefined]>(accessCallback);
const { FILE_DOES_NOT_EXIST } = ERRORS;

/**
 * Test whether or not the given path exists by checking with the file system.
 * Returns a promise that resolves to `true` or `false`
 *
 * ```js
 * import { exists } from '@oakfinch/node-utils/fs';
 *
 * try {
 *   const fileExists = await exists('/etc/passwd');
 *   console.log(fileExists ? 'it exists' : 'no passwd!');
 * } catch (error) {
 *   console.error(error);
 * }
 * ```
 *
 * Using `exists` to check for the existence of a file before calling
 * {@link read} {@link write} is not recommended. Doing so introduces a race
 * condition, since other processes may change the file's state between the two
 * calls. Instead, user code should read/write the file directly and handle the
 * error raised if the file does not exist.
 *
 * **write (NOT RECOMMENDED)**
 *
 * ```js
 * import { write, exists } from '@oakfinch/node-utils/fs';
 *
 * if (await exists('myfile')) {
 *   await write('myfile', data);
 * } else {
 *   console.error('file does not exist!');
 * }
 * ```
 *
 * **write (RECOMMENDED)**
 *
 * ```js
 * import { write, ERRORS } from '@oakfinch/node-utils/fs';
 *
 * try {
 *   await write('myfile', data);
 * } catch (error) {
 *   if (error.code === ERRORS.FILE_DOES_NOT_EXIST) {
 *     console.error('file does not exist!');
 *   }
 * }
 * ```
 *
 * The "not recommended" example above checks for existence and then uses the
 * file; the "recommended" example is better because it uses the file directly
 * and handles the error, if any.
 *
 * In general, check for the existence of a file only if the file won’t be
 * used directly, for example when its existence is a signal from another
 * process.
 */
export const exists = async (path: PathLike): Promise<boolean> => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch (error) {
    if (hasProperty(error, 'code') && error.code === FILE_DOES_NOT_EXIST) {
      return false;
    }
    throw error;
  }
};

/**
 * Returns true if the path exists, false otherwise.
 *
 * For detailed information, see the documentation of the asynchronous version
 * of this API: {@link exists}
 */
export const existsSync = nodeExistsSync;

export default exists;
