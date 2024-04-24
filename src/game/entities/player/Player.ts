import { getCenter } from "@app/game";
import { Entity } from "../entity";

class Player extends Entity {
  constructor(scene: Phaser.Scene) {
    const { x } = getCenter(scene.scale)

    super(scene, x, 50, 'char')
  }
}

export default Player
