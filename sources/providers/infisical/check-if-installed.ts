import {Report}    from '@yarnpkg/core';

import {asyncExec} from '../../utils';

export const CLI_BIN = `infisical` as const;

class InfisicalCLINotInstalledError extends Error {
  constructor() {
    super(`${CLI_BIN} cli not installed`);
  }
}
export const checkIfInstalled = async (report: Report) => {
  try {
    await asyncExec(`${CLI_BIN} --version`, [], false);
  } catch (e) {
    throw new InfisicalCLINotInstalledError();
  }
};
