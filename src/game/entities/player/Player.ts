import { Directions, TMoveParams, getCenter } from "@app/game";
import { Entity } from "../entity";

const DRAG = 30
const COEFF_ACCELERATION = 1000
const COEFF_VELOCITY = 50

class Player extends Entity {
  constructor(scene: Phaser.Scene) {
    const { x } = getCenter(scene.scale)

    super(scene, x, 50, 'char')

    this.resetMotion()
  }

  modifyMotion({ direction, distance, time }: TMoveParams) {
    const velocity = this.body?.velocity.length() || 0
    switch (direction) {
      case Directions.Down:
        this.setAccelerationY(COEFF_ACCELERATION * distance / time)
        break
      case Directions.Left:
      case Directions.Right:
        if (velocity > 0) {
          this.setVelocityX(COEFF_VELOCITY * (Directions.Down - direction))
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
