import { Directions, TMoveParams } from '@app/game';
import { Entity } from '../entity';

const DRAG = 30;
const BREAK = 1000;
const COEFF_ACCELERATION = 100;
const COEFF_VELOCITY = 0.057;

class Player extends Entity {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 50, 'char');

    this.setOrigin(0.5);

    this.setCollideWorldBounds(true, 0.5, 0.5);
    this.setBounce(0.5);
    this.setDrag(DRAG);
  }

  modifyMotion({ direction, time }: TMoveParams) {
    const velocity = this.body?.velocity.length() || 0;
    switch (direction) {
      case Directions.Left:
      case Directions.Right:
        if (velocity > 0) {
          const d = direction - Directions.Down;
          this.body?.velocity.rotate(COEFF_VELOCITY * d);
        }
        break;
      case Directions.Up:
        if (velocity > 0) {
          this.setDrag(time * 5);
        }
        break;
      default:
    }
  }

  checkAcceleration({ direction, distance, time }: TMoveParams) {
    if (direction === Directions.Down) {
      const cv = this.body?.velocity.y || 0;
      const dv = (COEFF_ACCELERATION * distance) / time;
      this.setVelocityY(cv + dv);
    }
    this.setDrag(DRAG);
  }

  break() {
    this.setDrag(BREAK);
  }

  resetDrag() {
    this.setDrag(DRAG);
  }
}

export default Player;
