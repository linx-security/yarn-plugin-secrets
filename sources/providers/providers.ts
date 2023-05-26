import {Project, Report}       from '@yarnpkg/core';

import {DopplerProvider}       from './doppler';
import {ProviderNotFoundError} from './errors';


type Provider = {
  get: ({project, report}: {project: Project, report: Report}) => Promise<Record<string, string>>;
};

const registry: {[key: string]: Provider} = {
  [DopplerProvider.key]: DopplerProvider,
};


export const register = (name: string, provider: Provider) => {
  registry[name] = provider;
};

export const factory = async (name: string): Promise<Provider> => {
  if (!registry[name]) throw new ProviderNotFoundError(name);

  return registry[name];
};
