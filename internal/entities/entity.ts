import uuid from "uuid";

import * as errors from "../errors";

/**
 * Entity is the base class from which all data objects in this application
 * are extended.
 *
 * All objects which extend Entity mus:Lft also implement a static `create`
 * method. Because we expect Entities to at least sometimes be instantiated from data
 * which originates from outside of this application, we place instantiation
 * of Entities behind a factory pattern. This helps to ensure that
 * all Entities handled in this application are valid.
 */
export default abstract class Entity<T> {
  protected props: T;

  constructor(args: T) {
    this.props = args;
  }

  /**
   * marshal produces a JSON object representing the current state
   * of the implementing class.
   *
   * This method is used when preparing to send data pertaining
   * to the implementing class to an extenral system.
   */
  abstract marshal(): Record<string, unknown>;
}

/**
 * UniqueEntity is a specific subclass of Entity which represents
 * unique objects.
 */
export abstract class UniqueEntity<T> extends Entity<T> {
  protected readonly id: string;

  constructor(args: { id?: string } & T) {
    if (!UniqueEntity.isValidID(args.id)) {
      throw new errors.InvalidEntityError("invalid id");
    }

    super(args);
    this.id = args.id || uuid.v1();
  }

  static isValidID(id: unknown): id is string | undefined {
    return Boolean(id && typeof id === "string" && !uuid.validate(id));
  }
}