import { UniqueEntity } from "./entity";
import * as item from "./item";

import * as errors from "../errors";

interface Props {
  id?: string;
  name: string;
  inventory: Record<item.ID, number>;
}

export default class Player extends UniqueEntity<Props> {
  private constructor(props: Props) {
    super(props);
  }

  marshal() {
    return {
      id: this.props.id,
      name: this.props.name,
    };
  }

  static create(data: Record<string, unknown>): Player {
    if (!UniqueEntity.isValidID(data.id)) {
      throw new errors.InvalidEntityError("invalid id");
    }
    if (typeof data.name !== "string") {
      throw new errors.InvalidEntityError("invalid name");
    }
    if (!item.isValidInventory(data.inventory)) {
      throw new errors.InvalidEntityError("invalid inventory");
    }

    return new Player({
      id: data.id,
      name: data.name,
      inventory: data.inventory,
    });
  }
}