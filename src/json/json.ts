/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  mkdirSync, existsSync, writeFileSync, readFileSync,
} from 'fs';
import { dirname } from 'path';
import format from 'format-json';
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
 * Updates a json file. Deep merges `data` into the existing object.
 */
export function update<T = any>(file: string, data: Partial<T>): void;
/**
 * Updates a json file. Deep merges `data` into the existing object.
 */
export function update<T = any>(file: string, data: Partial<T>, merge: true): void;
/**
 * Updates a json file. Overrides the existing object with `data`.
 */
export function update<T = any>(file: string, data: T, merge: false): void;
export function update<T = any>(file: string, data: Partial<T>, merge = true): void {
  writeFileSync(
    file,
    format.plain(merge ? mergeObjects(get<T>(file), data) : data),
  );
}
