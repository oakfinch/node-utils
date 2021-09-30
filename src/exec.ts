import { exec as nodeExec, ExecOptions } from 'child_process';

export const exec = async (
  command: string,
  options?: ExecOptions & { log?: boolean },
): Promise<string> => {
  const opts = {
    log: true,
    encoding: 'utf8',
    ...options,
    env: {
      ...(options?.env ?? {}),
    },
  } as const;

  return new Promise<string>((resolve, reject) => {
    nodeExec(command, opts, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (opts.log === true) {
        process.stdout.write(stdout);
        process.stderr.write(stderr);
      }
      resolve(stdout);
    });
  });
};

export default exec;
