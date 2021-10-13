import {
  mkdirSync, existsSync, writeFileSync, readFileSync,
} from 'fs';
import { dirname } from 'path';
import format from 'pretty-js';
import mergeObjects from 'lodash/merge';
import { EMPTY, ENCODING } from './constants';

/**
 * Creates an empty json file if one does not already exist
 *
 * @param file - path of the file to create
 * @returns true
 */
export const create = (file: string): true => {
  if (!existsSync(dirname(file))) {
    mkdirSync(dirname(file));
  }
  if (!existsSync(file)) {
    writeFileSync(file, EMPTY);
  }
  return true;
};

/**
 * Returns the contents of a json file as an object.
 *
 * Creates an empty file if one does not already exist.
 * @param file - path of the file to read
 * @returns - the contents of the file
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
export const get = <T = any>(file: string): T => create(file)
  && JSON.parse(readFileSync(file, { encoding: ENCODING }));

/**
 * Updates a json file.
 *
 * @param file
 * @param data
 */
export const update = <T, U = T>(file: string, data: T, merge = true): void => {
  writeFileSync(
    file,
    format(
      JSON.stringify(merge ? mergeObjects(get<U>(file), data) : data),
      { indent: '  ' },
    ),
  );
};
