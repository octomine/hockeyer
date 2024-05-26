import { Directions, TMoveParams } from "@app/game";
import { Entity } from "../entity";

const DRAG = 30
const COEFF_ACCELERATION = 100
const COEFF_VELOCITY = .057

class Player extends Entity {
  constructor(scene: Phaser.Scene, x: number) {
    super(scene, x, 50, 'char')

    this.setOrigin(.5)

    this.setCollideWorldBounds(true, .5, .5)
    this.setBounce(.5)
    this.setDrag(DRAG)
  }

  modifyMotion({ direction, time }: TMoveParams) {
    const velocity = this.body?.velocity.length() || 0
    switch (direction) {
      case Directions.Left:
      case Directions.Right:
        if (velocity > 0) {
          const v = this.body?.velocity
          const d = direction - Directions.Down
          v?.rotate(COEFF_VELOCITY * d)
          this.setVelocity(v?.x || 0, v?.y)
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

  checkAcceleration({ direction, distance, time }: TMoveParams) {
    if (direction === Directions.Down) {
      const cv = this.body?.velocity.y || 0
      const dv = COEFF_ACCELERATION * distance / time
      this.setVelocityY(cv + dv)
    }
    this.setDrag(DRAG)
  }
}

export default Player
