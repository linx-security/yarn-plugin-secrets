import {Project, Report} from '@yarnpkg/core';

export abstract class Provider {
  abstract get({project}: {project: Project, report:  Report}): Promise<Record<string, string>>;
}
