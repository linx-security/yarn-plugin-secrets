# Yarn Plugin: Secrets Management

## Description

This Yarn plugin assists with environment management for your JavaScript projects. It leverages the "setupScriptEnvironment" hook to wrap secretsOps providers, such as Doppler, injecting the appropriate environment variables into your process.

The plugin is particularly useful when your projects are organized in a specific manner on your secretsOps provider. For instance, if your Doppler projects are categorized as "frontend-e2e", "frontend-docs", etc., this plugin will match these with their equivalent scopes in your Yarn workspace, such as "@scope/docs", "@scope/e2e", and so on.

Currently, the plugin defaults to using "frontend" as the prefix for matching. Support for passing custom prefixes is not available due to the limitations of the Yarn plugins SDK.

## Installation

To be completed with your specific installation instructions...

## Usage

To be completed with your specific usage instructions...

## Matching Logic

The core logic of this plugin lies in its ability to match Doppler projects with their corresponding scopes in your Yarn workspace.

By default, it assumes a prefix of "frontend" for Doppler projects. For example, if you have Doppler projects like "frontend-e2e", "frontend-docs", the plugin will look for scopes in your Yarn workspace such as "@scope/docs", "@scope/e2e".

Please note, changing this default prefix is currently not supported. 

## Limitations

- Custom prefix support: As of the current version, this plugin doesn't support passing custom prefixes due to the limitations in Yarn plugins SDK.
- Infisicial support: While this plugin doesn't currently support Infisicial, we are considering adding this support if there's demand.

## Future Enhancements

We're looking forward to expanding the capabilities of this plugin. Future enhancements may include support for custom prefixes and Infisicial, subject to demand.

## Contributing

We welcome contributions! Please see the CONTRIBUTING.md file for more details.

## License

To be completed with your specific license information...

Please note that this is a draft and should be customized according to your specific plugin's features and requirements. Be sure to add installation instructions, usage examples, and any other information you think your users might need.
