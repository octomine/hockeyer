export enum Directions {
  None = 0,
  Up,
  Right,
  Down,
  Left,
}

export interface ISwipeConfig {
  onMove?: (direction: Directions, distance: number, time: number) => void
  onUp?: (direction: Directions) => void
}
