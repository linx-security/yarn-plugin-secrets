export class InvalidJsonError extends Error {
  constructor() {
    super(`InvalidJsonError`);
  }
}

export const safeJsonParse = (json: string): any => {
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new InvalidJsonError();
  }
};
