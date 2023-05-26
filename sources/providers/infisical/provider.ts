import {MessageName, Project, Report}               from '@yarnpkg/core';
import {PortablePath}                               from '@yarnpkg/fslib';

import {InvalidJsonError, asyncExec, safeJsonParse} from '../../utils';

import {CLI_BIN, checkIfInstalled}                  from './check-if-installed';
import {getConfig}                                  from './get-config';
import {parseSecrets}                               from './parse-secrets';


const PROVIDER_KEY = `infisical` as const;

export const  get = async ({project, report}: {project: Project, report: Report}): Promise<Record<string, string>>  => {
  const progress = Report.progressViaCounter(5);
  const loader = report.reportProgress(progress);

  try {
    // Step 1: Check pre-requisites
    progress.set(1);
    await checkIfInstalled(report);

    // Step 2: Get config
    progress.set(2);
    const workspace = (project.getWorkspaceByCwd(process.cwd() as PortablePath));
    const config = await getConfig(workspace, report);
    config && report.reportInfoOnce(MessageName.UNNAMED, `Project id: ${config.workspaceId}`);

    // Step 3: Get secrets
    progress.set(3);
    const secrets =  await asyncExec(`${CLI_BIN} export `, [`--format=json`], false);
    report.reportInfoOnce(MessageName.UNNAMED, `Fetched successfully`, {reportExtra: () => secrets});

    // Step 4: Parse secrets
    progress.set(4);
    const response = safeJsonParse(secrets);

    // Step 5: Map response to secrets object
    progress.set(5);
    const mappedSecrets = parseSecrets({secrets: response, report});
    return mappedSecrets;
  } catch (e) {
    if (e instanceof InvalidJsonError) {
      report.reportErrorOnce(MessageName.UNNAMED, `Invalid json returned from doppler`);
      return null;
    }

    report.reportErrorOnce(MessageName.UNNAMED, e.message);
    return null;
  } finally {
    loader.stop();
  }
};

export const InfisicalProvider = {
  get,
  key: PROVIDER_KEY,
};
