/* eslint-disable @typescript-eslint/no-explicit-any */
import format from 'format-json';
import mergeObjects from 'lodash/merge';
import { writeSync, readSync } from '../fs/module';
import { touchSync } from '../fs/touch';

/**
 * Creates an empty json file if one does not already exist
 *
 * @param file - path of the file to create
 * @returns true
 */
export const create = (file: string): true => touchSync(file, '{}');

/**
 * Returns the contents of a json file as an object.
 *
 * Creates an empty file if one does not already exist.
 * @param file - path of the file to read
 * @returns - the contents of the file
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
export const get = <T = any>(file: string): T => (
  create(file) && JSON.parse(readSync(file)) as T
);

/**
 * Updates a json file. Deep merges `data` into the existing object unless
 * `merge` is false
 */
export const update = <T = any>(
  file: string,
  data: Partial<T>,
  merge = true,
): void => {
  writeSync(file, format.plain(merge ? mergeObjects(get<T>(file), data) : data));
};
