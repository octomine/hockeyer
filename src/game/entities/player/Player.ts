import { Directions, getCenter } from "@app/game";
import { Entity } from "../entity";

const DRAG = 30

class Player extends Entity {
  constructor(scene: Phaser.Scene) {
    const { x } = getCenter(scene.scale)

    super(scene, x, 50, 'char')

    this.resetMotion()
  }

  modifyMotion(direction: Directions, distance: number, time: number) {
    const velocity = this.body?.velocity.length() || 0
    switch (direction) {
      case Directions.Down:
        this.setAccelerationY(1000 * distance / time)
        break
      case Directions.Left:
      case Directions.Right:
        if (velocity > 0) {
          this.setVelocityX(50 * (Directions.Down - direction))
        }
        break
      case Directions.Up:
        if (velocity > 0) {
          this.setDrag(time);
        }
        break
      default:
    }
  }

  resetMotion() {
    this.setAccelerationY(0)
    this.setDrag(DRAG)
  }
}

export default Player
