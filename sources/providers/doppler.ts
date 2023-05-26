import {MessageName, Project, Report} from '@yarnpkg/core';
import {PortablePath}                 from '@yarnpkg/fslib';

import {asyncExec}                    from '../async-exec';

import {Provider}                     from './provider';

export class Doppler implements Provider {
  private readonly prefix = process.env.SECRET_PROJECT_PREFIX ?? `frontend-`;

  async get({project, report}: {project: Project, report: Report}): Promise<Record<string, string>> {
    try {
      const workspace = project.getWorkspaceByCwd(process.cwd() as PortablePath);
      const name = workspace?.manifest.name.name;
      const isRoot = project.topLevelWorkspace.manifest.name.name === name;

      report.reportInfoOnce(MessageName.UNNAMED, `Getting secrets from doppler for ${name}`);

      const secrets =  await asyncExec(`doppler secrets download --no-file --format=json -p ${this.getProjectName(name, isRoot)}`, false);
      report.reportJson(secrets);
      const secretsJson = JSON.parse(secrets);

      return secretsJson;
    } catch (e) {
      report.reportErrorOnce(MessageName.UNNAMED, `Running doppler command went wrong`);
      return null;
    }
  }

  private getProjectName(name: string, isRoot?: boolean) {
    if (isRoot) return name;
    return `${this.prefix}${name}`;
  }
}
