import {Doppler}  from './doppler';
import {Provider} from './provider';

// Support Infisicial in the future
type SupportedProviders = 'doppler';

export const providers:  Record<SupportedProviders, typeof Provider> =  {
  doppler: Doppler,
};
