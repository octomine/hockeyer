import { Barrier, Bonus } from '../entities';
import { createLine } from '../utils';
import { LevelObject } from './Level.types';

const TEXTURE_COPIES = 5;
const F_STEP = 600;

class Level {
  private scene!: Phaser.Scene;
  private bonusGrp!: Phaser.Physics.Arcade.Group;
  private barrsGrp!: Phaser.Physics.Arcade.Group;

  constructor() {}

  init(
    scene: Phaser.Scene,
    bonusGrp: Phaser.Physics.Arcade.Group,
    barrsGrp: Phaser.Physics.Arcade.Group,
  ) {
    this.scene = scene;
    this.bonusGrp = bonusGrp;
    this.barrsGrp = barrsGrp;
  }

  create(): { width: number; height: number } {
    const { width, height } = this.scene.add.image(0, 0, 'ice').setOrigin(0);
    const h = height * TEXTURE_COPIES;
    for (let i = 0; i < TEXTURE_COPIES; i++) {
      this.scene.add.image(0, i * height, 'ice').setOrigin(0);
    }

    this.scene.physics.world.setBounds(0, 0, width, h);

    const init = { x: width / 2, y: 200 };
    for (let i = 0; i < 4; i++) {
      init.y = F_STEP + i * F_STEP;
      const sign = i % 2 === 0 ? 1 : -1;
      this.addObj(LevelObject.Bonus, init, createLine(5, sign * 20));
    }
    // init.x -= 100
    // for (let i = 0; i < 5; i++) {
    //   init.y = F_STEP + i * F_STEP - (F_STEP / 3)
    //   this.addObj(LevelObject.Barrier, init, createLine(3, 100, 0))
    // }

    return { width, height: h };
  }

  // TODO: чё-т вот тут как-то...
  private addObj(
    type: LevelObject,
    init: Phaser.Types.Math.Vector2Like,
    coordinates: Phaser.Types.Math.Vector2Like[],
  ) {
    let className;
    let group: Phaser.Physics.Arcade.Group;
    switch (type) {
      case LevelObject.Barrier:
        className = Barrier;
        group = this.barrsGrp;
        break;
      case LevelObject.Bonus:
        className = Bonus;
        group = this.bonusGrp;
        break;
      default:
        return;
    }
    const { x: ix, y: iy } = init;
    coordinates.forEach(({ x, y }) => {
      const obj = new className(this.scene, ix + x, iy + y);
      group.add(obj);
    });
  }
}

export default new Level();
