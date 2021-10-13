import { exec } from '../process/exec';
import { VersionParseError } from './version-parse-error';
import {
  REGEX_VERSION as REGEX,
  COMMAND_VERSION as COMMAND,
  VERSION_DELIMITER as DELIMITER,
  VERSION_DEFAULT as DEFAULT,
  VersionFormat,
} from './constants';

/**
 * Returns a promise that resolves to the major number of the current installed version of java.
 */
export async function getVersion(format: VersionFormat.major): Promise<number>;
/**
 * Returns a promise that resolves to the full version number string of the currently
 * installed version of java.
 */
export async function getVersion(format: VersionFormat.full): Promise<string>;
export async function getVersion(
  format: VersionFormat.major | VersionFormat.full,
): Promise<string | number> {
  const versionString = await exec(COMMAND);
  const version = REGEX.exec(versionString)?.[1];
  if (!version) {
    throw new VersionParseError(versionString);
  }

  const [major, minor = DEFAULT, patch = DEFAULT] = (
    version
      .split(DELIMITER)
      .map((s) => Number(s))
  );

  return format === VersionFormat.major
    ? major
    : [major, minor, patch].join(DELIMITER);
}

export default getVersion;
