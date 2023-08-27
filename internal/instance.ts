import { EventEmitter } from "node:events";

export default class Instance {
  private emitter: EventEmitter;
  private connections: number;
  private status: "open" | "pending" | "closed";

  constructor(opts: { minConnections: number }) {
    this.connections = 0;
    this.status = "pending";
    this.emitter = new EventEmitter();

    this.emitter.on("connect", () => {
      this.connections++;
    });

    this.emitter.on("disconnect", () => {
      this.connections--;
      if (this.connections < opts.minConnections) {
        this.emitter.emit("close");
      }
    });

    this.emitter.on("close", () => {
      this.status = "closed"
    });
  }

  connect() {
    if (this.status == "closed") {
      return null;
    }

    this.emitter.emit("connect");
  }

  disconnect() {
    if (this.status == "closed") {
      return null;
    }

    this.emitter.emit("disconnect");
  }
}