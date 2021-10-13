import { ChildProcess } from 'child_process';
import { EVENTS } from './constants';

/**
 * Takes in a function that returns a child process, and returns a function
 * that returns an object that combines that same child process with
 * a promise that resolves to the string value of stdout when that
 * process exits.
 */
export function promisifyChildProcess<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TArgs extends any[],
  TReturn extends ChildProcess,
  T extends (...args: TArgs) => TReturn,
>(fn: T): (...args: TArgs) => (Promise<string> & TReturn);
/**
 * Takes in a a child process, and returns an object that combines that same child process with
 * a promise that resolves to the string value of stdout when that process exits.
 */
export function promisifyChildProcess<
  T extends ChildProcess,
>(child: T): (Promise<string> & T);
export function promisifyChildProcess<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => ChildProcess,
>(arg: T | ChildProcess): unknown {
  if (arg instanceof ChildProcess) {
    const child = arg;
    const stdout: string[] = [];
    const stderr: string[] = [];

    child.stdout?.on(EVENTS.DATA, (data) => {
      stdout.push(data);
    });

    child.stderr?.on(EVENTS.DATA, (data) => {
      stdout.push(data);
    });

    const promise = new Promise<string>((resolve, reject) => {
      child.on(EVENTS.EXIT, (code) => {
        if (code === 0) {
          resolve(stdout.join('\n'));
        } else {
          reject(new Error(stderr.join('\n')));
        }
      });
    });

    return Object.assign(promise, child);
  }

  const fn = arg;
  return (...args: Parameters<T>) => {
    const child = fn(...args);
    return promisifyChildProcess(child);
  };
}

export default promisifyChildProcess;
