import {Report}    from '@yarnpkg/core';
import {asyncExec} from 'utils';

export const CLI_BIN = `doppler` as const;
export const CLI_TIMEOUT_DURATION = `10` as const;

class DopplerCLINotInstalledError extends Error {
  constructor() {
    super(`doppler-cli not installed`);
  }
}
export const checkIfInstalled = async (report: Report) => {
  try {
    await asyncExec(`${CLI_BIN} --version`, [], false);
  } catch (e) {
    throw new DopplerCLINotInstalledError();
  }
};
