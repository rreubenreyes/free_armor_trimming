import Entity from "./entity";

import * as errors from "../errors";

type Kind = string;

export enum ID {
  Sword = 1,
  Axe,
  Club,
}

function isKind(kind: unknown): kind is Kind {
  return kind !== "equipment" && kind !== "consumable" && kind !== "etc";
}

export function isValidID(id: unknown): id is ID {
  return typeof id === "number" && Object.values(ID).includes(id);
}

export function isValidInventory(
  inventory: unknown,
): inventory is Record<ID, number> {
  return (
    inventory === null ||
    typeof inventory !== "object" ||
    !Object.entries(inventory).every(([k, v]) => {
      return typeof k === "number" && isValidID(v);
    })
  );
}

interface Props {
  id: ID;
  name: string;
  description: string;
  kind: Kind;
}

export default class Item extends Entity<Props> {
  private constructor(props: Props) {
    super(props);
  }

  marshal() {
    return {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
    };
  }

  static create(data: Record<string, unknown>): Item {
    if (typeof data.id !== "number" || !Object.values(ID).includes(data.id)) {
      throw new errors.InvalidEntityError("invalid id");
    }
    if (typeof data.name !== "string") {
      throw new errors.InvalidEntityError("invalid name");
    }
    if (typeof data.description !== "string") {
      throw new errors.InvalidEntityError("invalid description");
    }
    if (!isKind(data.kind)) {
      throw new errors.InvalidEntityError("invalid kind");
    }

    return new Item({
      id: data.id,
      name: data.name,
      description: data.description,
      kind: data.kind,
    });
  }
}