/* eslint-disable @typescript-eslint/no-explicit-any */
import { dirname } from 'path';
import { hasProperty } from '@oakfinch/ts-utils';
import { mkdir, mkdirSync } from './mkdir';
import { write, writeSync } from './write';
import { FLAGS, ERRORS } from './constants';

/**
 * Asyncronously creates an empty file if one does not already exist
 *
 * @param path - path of the file to create
 */
export const touch = async (path: string, contents = ''): Promise<true> => {
  try {
    await mkdir(dirname(path), { recursive: true });
    await write(path, contents, { flag: FLAGS.WRITE_NO_OVERRIDE });
  } catch (error) {
    if (!hasProperty(error, 'code') || error.code !== ERRORS.FILE_EXISTS.CODE) {
      throw error;
    }
  }
  return true;
};

export const touchSync = (path: string, contents = ''): true => {
  try {
    mkdirSync(dirname(path), { recursive: true });
    writeSync(path, contents, { flag: FLAGS.WRITE_NO_OVERRIDE });
  } catch (error) {
    if (!hasProperty(error, 'code') || error.code !== ERRORS.FILE_EXISTS.CODE) {
      throw error;
    }
  }
  return true;
};

export default touch;
