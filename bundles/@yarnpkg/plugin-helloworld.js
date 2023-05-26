/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-helloworld",
factory: function (require) {
var plugin = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // sources/index.ts
  var sources_exports = {};
  __export(sources_exports, {
    default: () => sources_default
  });
  var import_core = __require("@yarnpkg/core");

  // sources/async-exec.ts
  var import_child_process = __require("child_process");
  function asyncExec(command, log = true) {
    return new Promise((resolve, reject) => {
      (0, import_child_process.exec)(command, (error, stdout, stderr) => {
        if (error) {
          if (log)
            console.error(`Error: ${error.message}, out: ${stderr ?? stdout}`);
          reject(error);
        } else {
          if (log)
            console.info(stdout);
          resolve(stdout);
        }
      });
    });
  }

  // sources/get-secrets-project.ts
  var PREFIX = `frontend-`;
  function getSecretsProject(name, isRoot) {
    if (isRoot)
      return name;
    return `${PREFIX}${name}`;
  }

  // sources/index.ts
  var plugin = {
    hooks: {
      setupScriptEnvironment: async (project, env) => {
        const workspace = project.getWorkspaceByCwd(process.cwd());
        const name = workspace == null ? void 0 : workspace.manifest.name.name;
        const isRoot = project.topLevelWorkspace.manifest.name.name === name;
        const report = await import_core.StreamReport.start(
          {
            configuration: {},
            stdout: process.stdout,
            includeLogs: true
          },
          async (report2) => {
            try {
              report2.reportInfoOnce(import_core.MessageName.UNNAMED, `Getting doppler secrets for project ${getSecretsProject(name, isRoot)}...`);
              const secrets = await asyncExec(`doppler secrets download --no-file --format=json -p ${getSecretsProject(name)}`, false);
              const secretsJson = JSON.parse(secrets);
              for (const [key, value] of Object.entries(secretsJson)) {
                env[key] = value;
              }
            } catch (e) {
            }
          }
        );
        await report.exitCode();
      }
    }
  };
  var sources_default = plugin;
  return __toCommonJS(sources_exports);
})();
return plugin;
}
};
