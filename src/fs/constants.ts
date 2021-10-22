import { constants } from 'fs';

export const ERRORS = {
  ILLEGAL_OP_ON_DIR: {
    CODE: 'EISDIR',
    MESSAGE: 'illegal operation on a directory, {operation} {path}',
    PARAMETERS: ['operation', 'path'],
  },
  FILE_DOES_NOT_EXIST: {
    CODE: 'ENOENT',
    MESSAGE: 'no such file or directory, {path}',
    PARAMETERS: ['path'],
  },
  FILE_EXISTS: {
    CODE: 'EEXIST',
    MESSAGE: 'file already exists, {path}',
    PARAMETERS: ['path'],
  },
} as const;

export const MODES = {
  EXISTS: constants.F_OK,
  READABLE: constants.R_OK,
  WRITEABLE: constants.W_OK,
  EXECUTABLE: constants.X_OK,
  READ_ONLY: constants.O_RDONLY,
  WRITE_ONLY: constants.O_WRONLY,
} as const;

export const ENCODINGS = {
  ASCII: 'ascii',
  UTF8: 'utf8',
  UTF16LE: 'utf16le',
  UCS2: 'ucs2',
  BASE64: 'base64',
  BASE64URL: 'base64url',
  LATIN1: 'latin1',
  BINARY: 'binary',
  HEX: 'hex',
  NONE: 'none',
} as const;

export const FLAGS = {
  /** Open file for appending. The file is created if it does not exist. */
  APPEND: 'a',
  /**
   * Open file for reading and appending. The file is created if it does not
   * exist.
   */
  READ_AND_APPEND: 'a+',
  /**
   * Open file for appending in synchronous mode. The file is created if it does
   * not exist.
   */
  APPEND_SYNC: 'as',
  /**
   * Open file for reading and appending in synchronous mode. The file is
   * created if it does not exist.
   */
  READ_AND_APPEND_SYNC: 'as+',
  /** Open file for reading. An exception occurs if the file does not exist. */
  READ: 'r',
  /**
   * Open file for reading and writing. An exception occurs if the file does not
   * exist.
   */
  READ_WRITE: 'r+',
  /**
   * Open file for reading and writing in synchronous mode. Instructs the
   * operating system to bypass the local file system cache.
   *
   * This is primarily useful for opening files on NFS mounts as it allows
   * skipping the potentially stale local cache. It has a very real impact on
   * I/O performance so using this flag is not recommended unless it is needed.
   *
   * This doesn't turn {@link read} or {@link write} into a synchronous blocking
   * call. If synchronous operation is desired, something like {@link readSync}
   * should be used.
   */
  READ_WRITE_SYNC: 'rs+',
  /**
   * Open file for writing. The file is created (if it does not exist) or
   * truncated (if it exists).
   */
  WRITE: 'w',
  /**
   * Open file for reading and writing. The file is created (if it does not
   * exist) or truncated (if it exists).
   */
  WRITE_READ: 'w+',
  /** Like {@link FLAGS.APPEND} but fails if the path exists. */
  APPEND_NO_OVERRIDE: 'ax',
  /** Like {@link FLAGS.READ_AND_APPEND} but fails if the path exists. */
  READ_AND_APPEND_NO_OVERRIDE: 'ax+',
  /** Like {@link FLAGS.WRITE} but fails if the path exists. */
  WRITE_NO_OVERRIDE: 'wx',
  /** Like {@link FLAGS.WRITE_READ} but fails if the path exists. */
  WRITE_READ_NO_OVERRIDE: 'wx+',
} as const;
