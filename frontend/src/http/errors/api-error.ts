export class ApiError extends Error {
  paths?: string[] | undefined;

  constructor(message: string, paths?: string[] | undefined) {
    super(message);
    this.paths = paths;
  }

  static [Symbol.hasInstance](instance: unknown): boolean {
    return (
      typeof instance === "object" &&
      instance !== null &&
      "message" in instance &&
      "paths" in instance
    );
  }
}
