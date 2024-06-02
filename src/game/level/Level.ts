import { Barrier, Bonus } from '../entities';
// import { createLine } from '../utils';
import { LevelObject } from './Level.types';

export const FINISH_OFFSET = 100;
const WORLD_PADDINGS = 50;
// const TEXTURE_COPIES = 5;
// const F_STEP = 600;

class Level {
  private scene!: Phaser.Scene;
  private background!: Phaser.GameObjects.TileSprite;
  private finish!: Phaser.GameObjects.TileSprite;
  private bonusGrp!: Phaser.Physics.Arcade.Group;
  private barrsGrp!: Phaser.Physics.Arcade.Group;

  constructor() { }

  init(
    scene: Phaser.Scene,
    background: Phaser.GameObjects.TileSprite,
    finish: Phaser.GameObjects.TileSprite,
    bonusGrp: Phaser.Physics.Arcade.Group,
    barrsGrp: Phaser.Physics.Arcade.Group,
  ) {
    this.scene = scene;
    this.background = background;
    this.finish = finish;
    this.bonusGrp = bonusGrp;
    this.barrsGrp = barrsGrp;
  }

  create(): { width: number; height: number } {
    this.barrsGrp.clear(true, true)
    this.bonusGrp.clear(true, true)

    const width = 500;
    const height = 2500;
    this.background.width = width;
    this.background.height = height;
    this.finish.width = width;
    this.finish.y = height - FINISH_OFFSET;
    console.log(this.finish.height);

    this.scene.physics.world.setBounds(0, 0, width, height);
    this.scene.cameras.main.setBounds(
      -WORLD_PADDINGS,
      -WORLD_PADDINGS,
      width + 2 * WORLD_PADDINGS,
      height + 2 * WORLD_PADDINGS,
    );

    const coordinates = []
    for (let i = 0; i < 10; i++) {
      coordinates.push({
        x: Phaser.Math.Between(0, width),
        y: Phaser.Math.Between(0, height)
      })
    }
    this.addObj(LevelObject.Barrier, { x: 0, y: 0 }, coordinates)

    // const init = { x: width / 2, y: 200 };
    // for (let i = 0; i < 4; i++) {
    //   init.y = F_STEP + i * F_STEP;
    //   const sign = i % 2 === 0 ? 1 : -1;
    //   this.addObj(LevelObject.Bonus, init, createLine(5, sign * 20));
    // }
    // init.x -= 100
    // for (let i = 0; i < 5; i++) {
    //   init.y = F_STEP + i * F_STEP - (F_STEP / 3)
    //   this.addObj(LevelObject.Barrier, init, createLine(3, 100, 0))
    // }

    return { width, height };
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
