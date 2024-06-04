import { Entity } from '../entity';

class Bonus extends Entity {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bonus');

    this.setScale(0.5);
  }

  collect() {
    this.scene.tweens.add({
      targets: this,
      duration: 300,
      scale: 1.5,
      alpha: 0,
      y: this.y - 50,
      ease: 'Quintic.easeInOut',
      onComplete: () => {
        this.destroy();
      },
    });
  }
}

export default Bonus;
