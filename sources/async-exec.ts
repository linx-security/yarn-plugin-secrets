import {exec} from 'child_process';

export function asyncExec(command: string, log: boolean = true): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        if (log) console.error(`Error: ${error.message}, out: ${stderr ?? stdout}`);
        reject(error);
      } else {
        if (log) console.info(stdout);
        resolve(stdout);
      }
    });
  });
}
