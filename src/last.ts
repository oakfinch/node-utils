import type { Last } from '@oakfinch/ts-extra';

export const last = <T, U extends readonly T[]>(arr: U): Last<U> => arr[arr.length - 1];

export default last;
