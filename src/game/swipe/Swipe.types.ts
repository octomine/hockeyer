export enum Directions {
  None = 0,
  Up,
  Right,
  Down,
  Left,
}

export interface ISwipeConfig {
  callback?: (direction: Directions) => void
}
