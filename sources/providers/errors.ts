export class ProviderNotFoundError extends Error {
  constructor(name: string) {
    super(`Provider ${name} not found`);
  }
}
