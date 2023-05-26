import {MessageName, Report, Workspace} from '@yarnpkg/core';
import {readFile, readdir}              from 'fs/promises';
import {parse}                          from 'yaml';


type Config = {
  setup: {
    project: string;
  };
};

const CONFIGURATION_FILES = [`doppler.yaml`, `doppler.yml`] as const;


export const getConfig = async ({cwd: workspacePath, manifest}: Workspace, report: Report): Promise<Config> => {
  const name = manifest.name.name;
  const configs = (await readdir(workspacePath)).filter(file => CONFIGURATION_FILES.some(fileName => file.includes(fileName)));


  if (!configs?.length)  {
    report.reportWarningOnce(MessageName.UNNAMED, `No doppler configuration file found, falling back to workspace name ${name}`);
    return {setup: {project: name}};
  }

  if (configs.length > 1)
    report.reportWarningOnce(MessageName.UNNAMED, `Multiple doppler configuration files found`, {reportExtra: () => config});


  const config = configs[0];

  const content = await readFile(`${workspacePath}/${config}`, `utf8`);
  const parsed = parse(content);


  return parsed;
};
