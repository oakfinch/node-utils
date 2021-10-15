import { execSync } from 'child_process';
import { AnyObject } from '@oakfinch/ts-extra';
import { VersionParseError } from './version-parse-error';
import {
  REGEX_VERSION as REGEX,
  COMMAND_VERSION as COMMAND,
  VERSION_DELIMITER as DELIMITER,
  VERSION_DEFAULT as DEFAULT,
  VERSION_FORMAT as FORMAT,
} from './constants';

/**
 * Returns a promise that resolves to the major number of the current installed version of java.
 */
export function getVersion(format: typeof FORMAT.MAJOR, env?: AnyObject): number;
/**
 * Returns a promise that resolves to the full version number string of the currently
 * installed version of java.
 */
export function getVersion(format: typeof FORMAT.FULL, env?: AnyObject): string;
export function getVersion(
  format: typeof FORMAT.MAJOR | typeof FORMAT.FULL,
  env = {},
): string | number {
  const versionString = execSync(COMMAND, { encoding: 'utf-8', env });
  const version = REGEX.exec(versionString)?.[1];
  if (!version) {
    throw new VersionParseError(versionString);
  }

  const [major, minor = DEFAULT, patch = DEFAULT] = (
    version
      .split(DELIMITER)
      .map((s) => Number(s))
  );

  return format === FORMAT.MAJOR
    ? major
    : [major, minor, patch].join(DELIMITER);
}

export default getVersion;
