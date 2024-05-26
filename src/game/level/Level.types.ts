import { Barrier, Bonus } from "../entities";

export enum LevelObject {
  Barrier = 0,
  Bonus,
}

export type TLevelObject = Barrier | Bonus
