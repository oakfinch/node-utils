import { Value } from '@oakfinch/ts-extra';
import { replace } from '@oakfinch/ts-utils';
import type { ERRORS } from '../constants';

export class FileError<T extends Value<typeof ERRORS>> extends Error {
  code: T['CODE'];

  constructor(type: T, params: Record<Value<T['PARAMETERS']>, string>) {
    super(replace(type.MESSAGE, params));
    this.code = type.CODE;
  }
}

export default FileError;
