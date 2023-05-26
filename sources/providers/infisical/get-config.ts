import {MessageName, Report, Workspace} from '@yarnpkg/core';
import {readFile, readdir}              from 'fs/promises';

import {safeJsonParse}                  from '../../utils';


type Config = {
  workspaceId: string;
  defaultEnvironment: string;
  gitBranchToEnvironmentMapping: null | any;
};

const CONFIGURATION_FILES = [`.infisical.json`] as const;


export const getConfig = async ({cwd: workspacePath}: Workspace, report: Report): Promise<Config | null> => {
  const configs = (await readdir(workspacePath)).filter(file => CONFIGURATION_FILES.some(fileName => file.includes(fileName)));


  if (!configs?.length) {
    report.reportWarningOnce(MessageName.UNNAMED, `No infisical configuration file found.`);
    return null;
  }


  if (configs.length > 1)
    report.reportWarningOnce(MessageName.UNNAMED, `Multiple infisical configuration files found`, {reportExtra: () => config});


  const config = configs[0];

  const content = await readFile(`${workspacePath}/${config}`, `utf8`);
  const parsed = safeJsonParse(content);


  return parsed;
};
