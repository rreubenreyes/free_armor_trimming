import VError from "verror"

export function define(name: string): typeof err {
  const err = class extends VError {
    constructor(message: string, overrideOpts: VError.Options = {}) {
      super({
        ...overrideOpts,
        name,
      }, message)
    }
  }
  Object.defineProperty(err, "name", { value: name })

  return err
}

export const InvalidEntityError = define("InvalidEntityError");