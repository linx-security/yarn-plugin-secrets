# Yarn Plugin: Secrets Management

## Description

This Yarn plugin assists with environment management for your JavaScript projects. It leverages the "setupScriptEnvironment" hook to wrap secretsOps providers, such as Doppler, Infisical  injecting the appropriate environment variables into your process.

## Installation

| Plugin   | Command |
|----------|---------|
| Doppler  | `yarn plugin import https://raw.githubusercontent.com/yarinsa/yarn-plugin-secrets/v0.0.3/packages/core/bundles/%40yarnpkg/plugin-secrets-doppler.js` |
| Infisical | `yarn plugin import https://raw.githubusercontent.com/yarinsa/yarn-plugin-secrets/v0.0.3/packages/core/bundles/%40yarnpkg/plugin-secrets-doppler.js` |


## Usage

Plug n Play, just install :)

## Future Enhancements


- [ ] Doppler: Infer project from doppler.yaml
- [ ] Infra: Generic progress at top level
- [ ] Providers: Improve error handling, such as missing token, binary, etc.

(You are welcome to suggest new features)

## Contributing

We welcome contributions!
The build process for different providers is still manual. Consider it a tech debt, hoping to add more infra and contribution document soon.
## License

GNU GPLv3

Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.
