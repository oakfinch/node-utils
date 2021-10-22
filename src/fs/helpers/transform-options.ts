import { isObject, isNull } from '@oakfinch/ts-utils';
import type { Options, Encoding } from '../types';
import { ENCODINGS } from '../constants';

type TransformOptionsReturn<T extends Encoding> = T extends null | typeof ENCODINGS.NONE
  ? Omit<Options<T>, 'encoding'>
  : Options<T>;

/** transform options argument into an object to pass to fs.readFile */
export const transformOptions = <
  T0 extends Encoding,
  T1 extends Partial<Options<T0>>,
>(defaults: T1) => <
  T extends T0,
>(options?: Options<T> | T): TransformOptionsReturn<T> => {
  // convert string to object
  const normalized = (
    isObject(options)
      ? options
      : ({ encoding: options })
  ) as T extends null ? Options<typeof ENCODINGS.NONE> : Options<T>;

  // normalize 'none' encoding
  if (isNull(normalized.encoding)) {
    normalized.encoding = ENCODINGS.NONE;
  }

  const { encoding, ...rest } = {
    ...defaults,
    ...normalized,
  };

  // fs.readFile expects { encoding: undefined }, not { encoding: 'none' }
  return encoding === ENCODINGS.NONE ? rest : { ...rest, encoding };
};

export default transformOptions;
