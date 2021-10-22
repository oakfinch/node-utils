import { writeFile as writeFileCb, writeFileSync, PathOrFileDescriptor } from 'fs';
import type { Abortable } from 'events';
import { promisify } from '@oakfinch/ts-utils';
import { FLAGS, ENCODINGS } from './constants';
import type { Encoding, Options } from './types';
import { transformOptions } from './helpers/transform-options';

// promisify fs.writeFile
const writeFilePromise = promisify<
[
  path: PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView,
  options: {
    encoding?: BufferEncoding;
    flag?: string;
  } & Abortable,
],
void
>(writeFileCb);

const transform = transformOptions({
  encoding: ENCODINGS.UTF8,
  flag: FLAGS.WRITE,
});

/**
 * Asynchronously writes the entire contents of a file.
 *
 * The `write` function buffers the entire file. To minimize memory costs,
 * when possible prefer streaming via {@link streamFile}.
 *
 * @example
 * ```js
 * import { write, ERRORS } from '@oakfinch/node-utils/fs';
 *
 * try {
 *   await write('/path/to/file', contents, 'utf8');
 * } catch (error) {
 *   if (error.code === ERRORS.FILE_DOES_NOT_EXIST.CODE) {
 *     console.error('file does not exist!');
 *   } else {
 *     throw error;
 *   }
 * }
 * ```
 */
export async function write<T extends Encoding>(
  path: PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView,
  encoding?: T,
): Promise<void>;
/**
 * Asynchronously writes the entire contents of a file.
 *
 * The `write` function buffers the entire file. To minimize memory costs,
 * when possible prefer streaming via {@link streamFile}.
 *
 * The options passed here act identically to the options passed to
 * [fs.writeFile](https://nodejs.org/api/fs.html#fswritefilepath-options-callback),
 * with the main exception being that `encoding` defaults to `'utf8'`.
 *
 * @example
 * ```js
 * import { write, ERRORS } from '@oakfinch/node-utils/fs';
 *
 * try {
 *   const contents = await write('/path/to/file', contents, { encoding: 'utf8' });
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
 * import { write } from '@oakfinch/node-utils/fs';
 *
 * const controller = new AbortController();
 * const signal = controller.signal;
 * const promise = write('/path/to/file', contents, { signal });
 *
 * setTimeout(() => {
 *   controller.abort();
 * }, 10000)
 *
 * try {
 *   await promise;
 * } catch (error) {
 *   if (error.name === 'AbortError') {
 *     throw new Error('write file timed out')
 *   }
 * }
 * ```
 */
export async function write<T extends Encoding>(
  path: PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView,
  options?: Options<T>,
): Promise<void>;
export async function write<T extends Encoding>(
  path: PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView,
  encodingOrOptions?: Options<T> | T,
): Promise<void> {
  return writeFilePromise(path, data, transform(encodingOrOptions));
}

/**
 * Synchronously writes the entire contents of a file.
 *
 * For detailed information, see the documentation of the asynchronous version
 * of this API: {@link write}
 */
export function writeSync<T extends Encoding>(
  path: PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView,
  encoding?: T,
): void;
/**
 * Synchronously writes the entire contents of a file.
 *
 * For detailed information, see the documentation of the asynchronous version
 * of this API: {@link write}
 */
export function writeSync<T extends Encoding>(
  path: PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView,
  options?: Options<T>,
): void;
export function writeSync<T extends Encoding>(
  path: PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView,
  encodingOrOptions?: Options<T> | T,
): void {
  return writeFileSync(path, data, transform(encodingOrOptions));
}

export default write;
