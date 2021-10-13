import { exec as nodeExec, ExecOptions } from 'child_process';

export const exec = async (
  command: string,
  {
    log = false,
    encoding = 'utf-8',
    ...options
  }: ExecOptions & { encoding?: BufferEncoding, log?: boolean } = {},
): Promise<string> => new Promise<string>((resolve, reject) => {
  nodeExec(command, { encoding, ...options }, (error, stdout, stderr) => {
    if (log === true) {
      process.stdout.write(stdout);
      process.stderr.write(stderr);
    }
    if (error) {
      reject(error);
    } else {
      resolve(stdout);
    }
  });
});

export default exec;
