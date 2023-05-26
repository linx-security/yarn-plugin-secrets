import {Project, Report}       from '@yarnpkg/core';

import {DopplerProvider}       from './doppler';
import {ProviderNotFoundError} from './errors';
import {InfisicalProvider}     from './infisical';


type Provider = {
  get: ({project, report}: {project: Project, report: Report}) => Promise<Record<string, string>>;
};

const registry: {[key: string]: Provider} = {
  [DopplerProvider.key]: DopplerProvider,
  [InfisicalProvider.key]: InfisicalProvider,
};

export const factory = async (name: string): Promise<Provider> => {
  if (!registry[name]) throw new ProviderNotFoundError(name);

  return registry[name];
};
