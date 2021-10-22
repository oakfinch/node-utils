import { readFile as readFileCb, readFileSync, PathOrFileDescriptor } from 'fs';
import type { Abortable } from 'events';
import { promisify } from '@oakfinch/ts-utils';
import { FLAGS, ENCODINGS, ERRORS } from './constants';
import { FileError } from './helpers/error';
import type { Encoding, NullEncoding, Options } from './types';
import { transformOptions } from './helpers/transform-options';

// promisify fs.readFile
const readFilePromise = promisify<
[
  path: PathOrFileDescriptor,
  options: {
    encoding?: BufferEncoding;
    flag?: string;
  } & Abortable,
],
string | Buffer
>(readFileCb);

// transform options argument into an object to pass to fs.readFile
const transform = transformOptions({
  encoding: ENCODINGS.UTF8,
  flag: FLAGS.READ,
});

// handle how FreeBSD returns an object when you read a directory, rather than
// throwing an error like every other OS
const handleOpenBsd = <T extends string | Buffer>(
  path: PathOrFileDescriptor,
  contents: T,
) => {
  if (typeof contents !== 'string' && !(contents instanceof Buffer)) {
    throw new FileError(
      ERRORS.ILLEGAL_OP_ON_DIR,
      { operation: 'read', path: String(path) },
    );
  }
  return contents;
};

/**
 * Asynchronously reads the entire contents of a file.
 *
 * The `read` function buffers the entire file. To minimize memory costs,
 * when possible prefer streaming via {@link streamFile}.
 *
 * @param path              the path of the file to read
 * @param [encoding='utf8'] the encoding of the file. if `null` or `'none'`,
 *                          the returned promise will resolve to a `Buffer`
 *                          instead of a string.
 *
 * @example
 * ```js
 * import { read, ERRORS } from '@oakfinch/node-utils/fs';
 *
 * try {
 *   const contents = await read('/path/to/file', 'utf8');
 * } catch (error) {
 *   if (error.code === ERRORS.FILE_DOES_NOT_EXIST.CODE) {
 *     console.error('file does not exist!');
 *   } else {
 *     throw error;
 *   }
 * }
 * ```
 */
export async function read(path: PathOrFileDescriptor): Promise<string>;
/**
 * Asynchronously reads the entire contents of a file.
 *
 * The `read` function buffers the entire file. To minimize memory costs,
 * when possible prefer streaming via {@link streamFile}.
 *
 * @param path              the path of the file to read
 * @param [encoding='utf8'] the encoding of the file. if `null` or `'none'`,
 *                          the returned promise will resolve to a `Buffer`
 *                          instead of a string.
 *
 * @example
 * ```js
 * import { read, ERRORS } from '@oakfinch/node-utils/fs';
 *
 * try {
 *   const contents = await read('/path/to/file', 'utf8');
 * } catch (error) {
 *   if (error.code === ERRORS.FILE_DOES_NOT_EXIST.CODE) {
 *     console.error('file does not exist!');
 *   } else {
 *     throw error;
 *   }
 * }
 * ```
 */
export async function read<T extends Encoding>(
  path: PathOrFileDescriptor,
  encoding: T,
): Promise<T extends NullEncoding ? Buffer : string>;
/**
 * Asynchronously reads the entire contents of a file.
 *
 * The `read` function buffers the entire file. To minimize memory costs,
 * when possible prefer streaming via {@link streamFile}.
 *
 * The options passed here act identically to the options passed to
 * [fs.readFile](https://nodejs.org/api/fs.html#fsreadfilepath-options-callback),
 * with the main exception being that `encoding` defaults to `'utf8'`.
 *
 * @param path                      the path of the file to read
 * @param [options.encoding='utf8'] the encoding of the file. If `null` or
 *                                  `'none'`, the returned promise will resolve
 *                                  to a `Buffer` instead of a string.
 *
 * @example
 * ```js
 * import { read, ERRORS } from '@oakfinch/node-utils/fs';
 *
 * try {
 *   const contents = await read('/path/to/file', { encoding: 'utf8' });
 * } catch (error) {
 *   if (error.code === ERRORS.FILE_DOES_NOT_EXIST.CODE) {
 *     console.error('file does not exist!');
 *   } else {
 *     throw error;
 *   }
 * }
 * ```
 *
 * It is possible to abort an ongoing request using an `AbortSignal`. If a
 * request is aborted the callback is called with an `AbortError`:
 *
 * @example
 * ```js
 * import { read } from '@oakfinch/node-utils/fs';
 *
 * const controller = new AbortController();
 * const signal = controller.signal;
 * const promise = read('/path/to/file', { signal });
 *
 * setTimeout(() => {
 *   controller.abort();
 * }, 10000)
 *
 * try {
 *   await promise;
 * } catch (error) {
 *   if (error.name === 'AbortError') {
 *     throw new Error('read file timed out')
 *   }
 * }
 * ```
 */
export async function read<T extends Encoding>(
  path: PathOrFileDescriptor,
  options: Options<T>,
): Promise<T extends NullEncoding ? Buffer : string>;
export async function read<T extends Encoding>(
  path: PathOrFileDescriptor,
  encodingOrOptions?: Options<T> | T,
): Promise<T extends NullEncoding ? Buffer : string> {
  return handleOpenBsd(
    path,
    await readFilePromise(path, transform(encodingOrOptions)),
  ) as T extends NullEncoding ? Buffer : string;
}

/**
 * Synchronously reads the entire contents of a file.
 *
 * For detailed information, see the documentation of the asynchronous version
 * of this API: {@link read}
 */
export function readSync(path: PathOrFileDescriptor): string;
/**
 * Synchronously reads the entire contents of a file.
 *
 * For detailed information, see the documentation of the asynchronous version
 * of this API: {@link read}
 */
export function readSync<T extends Encoding>(
  path: PathOrFileDescriptor,
  encoding: T,
): T extends NullEncoding ? Buffer : string;
/**
 * Synchronously reads the entire contents of a file.
 *
 * For detailed information, see the documentation of the asynchronous version
 * of this API: {@link read}
 */
export function readSync<T extends Encoding>(
  path: PathOrFileDescriptor,
  options: Options<T>,
): T extends NullEncoding ? Buffer : string;
export function readSync<T extends Encoding>(
  path: PathOrFileDescriptor,
  encodingOrOptions?: Options<T> | T,
): T extends NullEncoding ? Buffer : string {
  return handleOpenBsd(
    path,
    readFileSync(path, transform(encodingOrOptions)),
  ) as T extends NullEncoding ? Buffer : string;
}

export default read;
