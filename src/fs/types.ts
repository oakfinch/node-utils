import { Value } from '@oakfinch/ts-extra';
import type { Abortable } from 'events';
import type { ENCODINGS, FLAGS } from './constants';

export type NullEncoding = null | typeof ENCODINGS.NONE;
export type Encoding = BufferEncoding | Value<typeof ENCODINGS> | NullEncoding;
export type TextEncoding = Exclude<Encoding, NullEncoding>;
export type Flag = Value<typeof FLAGS>;
export type Options<T extends Encoding> = {
  encoding?: T;
  flag?: Flag;
} & Abortable;
