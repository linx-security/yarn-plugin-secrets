import {asyncExec}                     from 'utils';

import {CLI_BIN, CLI_TIMEOUT_DURATION} from './check-if-installed';

export const checkIfProjectExist = async (name: string) => {
  try {
    await asyncExec(`${CLI_BIN} projects get ${name}`, [`--timeout ${CLI_TIMEOUT_DURATION}s`], false);
    return true;
  } catch {
    return false;
  }
};
