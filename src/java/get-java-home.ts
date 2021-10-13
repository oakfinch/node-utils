import { existsSync } from 'fs';
import { exec } from '../process/exec';
import {
  MACOS_GET_JAVA_HOME,
  MACOS_GET_JAVA_HOME_VERSION_FLAG as FLAG,
} from './constants';

/**
 * returns a promise that resolves to the path of the java binary
 */
export async function getJavaHome(): Promise<string>;
/**
 * returns a promise that resolves to the path of the java binary corresponding
 * to the provided version number
 */
export async function getJavaHome(version: string | number): Promise<string>;
export async function getJavaHome(version?: string | number): Promise<string> {
  return (
    existsSync(MACOS_GET_JAVA_HOME)
      ? exec(`${MACOS_GET_JAVA_HOME}${version ? ` ${FLAG} ${version}` : ''}`)
      : process.env.JAVA_HOME
  ) ?? '';
}

export default getJavaHome;
