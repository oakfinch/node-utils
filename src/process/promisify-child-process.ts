import { ChildProcess } from 'child_process';
import type { AnyArray } from '@oakfinch/ts-extra';
import { EVENTS } from './constants';

export function promisifyChildProcess<
  T extends (...args: AnyArray) => ChildProcess,
>(fn: T): (...args: Parameters<T>) => (Promise<string> & ChildProcess);
export function promisifyChildProcess(child: ChildProcess): (Promise<string> & ChildProcess);
export function promisifyChildProcess<
  T extends (...args: AnyArray) => ChildProcess,
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
