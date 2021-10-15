import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { safe } from '@oakfinch/ts-utils';
import {
  MACOS_GET_JAVA_HOME,
  MACOS_GET_JAVA_HOME_VERSION_FLAG as FLAG,
} from './constants';

/**
 * Locate the `java` binary
 *
 * @returns the path of the `java` binary
 */
export function getJavaHome(): string;
/**
 * Locate the `java` binary corresponding to the provided version number
 *
 * @returns the path of the `java` binary
 */
export function getJavaHome(version: string | number): string;
export function getJavaHome(version?: string | number): string {
  return (
    existsSync(MACOS_GET_JAVA_HOME)
    && safe(() => execSync(
      `${MACOS_GET_JAVA_HOME}${version ? ` ${FLAG} ${version}` : ''}`,
      { encoding: 'utf-8' },
    ))
  )
  || process.env.JAVA_HOME
  || '';
}

export default getJavaHome;
