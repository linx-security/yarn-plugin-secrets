import {MessageName, Report} from '@yarnpkg/core';
import {asyncExec}           from 'utils';

export const CLI_BIN = `doppler` as const;
export const CLI_TIMEOUT_DURATION = `10` as const;

class DopplerCLINotInstalledError extends Error {
  constructor() {
    super(`doppler-cli not installed, secrets will not be fetched and injected`);
  }
}
export const checkIfInstalled = async (report: Report) => {
  try {
    await asyncExec(`${CLI_BIN} --version`, [], false);
    return true;
  } catch (e) {
    report.reportWarningOnce(MessageName.UNNAMED, new DopplerCLINotInstalledError().message);
    return false;
  }
};
