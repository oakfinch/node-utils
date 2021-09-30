import type { ArrayItem, AnyArray } from '@oakfinch/ts-extra';

export const isIncluded = <
  T extends Readonly<AnyArray>,
  U extends ArrayItem<T>,
  V,
>(item: U | V, array: T): item is U => array.includes(item);

export default isIncluded;
