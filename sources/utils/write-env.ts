import {MessageName, Report} from '@yarnpkg/core';


export const writeEnv = (env: ProcessEnvironment, secrets: ProcessEnvironment, report?: Report) => {
  for (const [key, value] of Object.entries(secrets)) {
    const envValue = env[key];
    if (envValue && envValue !== value && report)
      report.reportWarningOnce(MessageName.UNNAMED, `Overriding environment variable ${key} with value from secrets provider`);


    env[key] = value;
  }
};
