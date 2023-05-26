import {Report}    from '@yarnpkg/core';

import {asyncExec} from '../../utils';

export const CLI_BIN = `doppler` as const;

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
