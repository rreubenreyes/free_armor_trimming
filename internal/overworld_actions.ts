export abstract class Trade {
  private instance: Instance;
  private players: Players;

  abstract add(): void;
  abstract remove(): void;
  abstract accept(): void;
  abstract decline(): void;
}