import {MessageName, Report} from '@yarnpkg/core';

export const parseSecrets = ({secrets, report}: {secrets: unknown, report: Report}) => {
  if (!(Array.isArray(secrets))) {
    report.reportErrorOnce(MessageName.UNNAMED, `Invalid json returned from infisical`);
    return null;
  }

  const keyVal = secrets.reduce((acc, {key, value}) => {
    acc[key] = value;
    return acc;
  }, {});

  return keyVal;
};
