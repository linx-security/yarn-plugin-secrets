import {Hooks, MessageName, Plugin, Project, StreamReport} from '@yarnpkg/core';

import {providers}                                         from './providers';

const plugin: Plugin<Hooks> = {
  hooks: {
    setupScriptEnvironment: async (project: Project, env: Record<string, string>) => {
      const provider = process.env.SECRETS_PROVIDER || `doppler`;
      const Provider = providers[provider];

      const report = await StreamReport.start(
        {
          configuration: project.configuration,
          stdout: process.stdout,
          includeLogs: true,
        },
        async (report: StreamReport) => {
          try {
            const secrets = await new Provider().get({project, report});

            for (const [key, value] of Object.entries(secrets)) {
              if (env[key])
                report.reportWarningOnce(MessageName.UNNAMED, `Overriding environment variable ${key} with value from doppler`);

              env[key] = value as unknown as string;
            }
          } catch (e) {
            report.reportErrorOnce(MessageName.UNNAMED, `Running ${provider} command went wrong`);
            // new ReportError(MessageName.WORKSPACE_NOT_FOUND, `Cannot find workspace ${name} in doppler`);
            // console.log(`Error: ${e.message}`);
            // workspace.project.return;
          }
        },
      );
      report.exitCode();
    },
  },
};

// eslint-disable-next-line arca/no-default-export
export default plugin;
