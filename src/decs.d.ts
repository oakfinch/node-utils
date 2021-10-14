/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'format-json' {
  declare const format: {
    diffy: (obj: any) => string;
    plain: (obj: any) => string;
    terse: (obj: any) => string;
    space: (obj: any) => string;
    lines: (obj: any) => string;
  };
  export default format;
}
