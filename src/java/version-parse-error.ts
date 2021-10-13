import { ERROR_CANT_PARSE } from './constants';

export class VersionParseError extends Error {
  constructor(version: string) {
    super(`${ERROR_CANT_PARSE} \`${version}\``);
  }
}

export default VersionParseError;
