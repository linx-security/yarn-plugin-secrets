import {MessageName, Report, Workspace} from '@yarnpkg/core';
import {readFile, readdir}              from 'fs/promises';
import {load}                           from 'js-yaml';


type Config = {
  setup: {
    project: string;
    config?: string;
  } | false;
  isInferred: boolean;
};

const CONFIGURATION_FILES = [`doppler.yaml`, `doppler.yml`] as const;


export const getConfig = async ({cwd: workspacePath, manifest}: Workspace, report: Report): Promise<Config> => {
  const name = manifest.name.name;
  const configs = (await readdir(workspacePath)).filter(file => CONFIGURATION_FILES.some(fileName => file.includes(fileName)));

  if (configs.length > 1)
    report.reportWarningOnce(MessageName.UNNAMED, `Multiple doppler configuration files found`, {reportExtra: () => config});

  if (!configs?.length)  {
    report.reportWarningOnce(MessageName.UNNAMED, `No doppler configuration file found, falling back to workspace name ${name}`);
    return {setup: {project: name}, isInferred: true};
  }

  const config = configs[0];
  const content = await readFile(`${workspacePath}/${config}`, `utf8`);
  const parsed = load(content, {json: true}) as Config;

  if (parsed?.setup === false) {
    report.reportWarningOnce(MessageName.UNNAMED, `Setup set to false. Skipping...`);
    return {setup: false, isInferred: false};
  }


  return {setup: parsed.setup, isInferred: false};
};
