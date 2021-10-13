declare module 'pretty-js' {
  const format: (code: string, options?: { indent?: string }) => string;
  export default format;
}
