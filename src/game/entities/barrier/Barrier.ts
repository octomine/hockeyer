import { Entity } from '../entity';

class Barrier extends Entity {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bar');

    this.setScale(0.75);
  }
}

export default Barrier;
