import { spawn as nodeSpawn, SpawnOptions, ChildProcess } from 'child_process';
import { promisifyChildProcess as promisify } from './promisify-child-process';

/**
 * Returns a ChildProcess that can be `await`-ed
 */
export function spawn(
  command: string,
  args?: string[],
  options?: SpawnOptions
): Promise<string> & ChildProcess;
/**
 * Returns a ChildProcess that can be `await`-ed
 */
export function spawn(
  command: string,
  options?: SpawnOptions
): Promise<string> & ChildProcess;
export function spawn(
  ...args:
  | [command: string, args?: string[], options?: SpawnOptions]
  | [command: string, options?: SpawnOptions]
): Promise<string> & ChildProcess {
  return promisify(nodeSpawn(...args as [string]));
}

export default spawn;
