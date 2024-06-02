import Level, { FINISH_OFFSET } from '@app/game/level/Level';
import { Player, Swipe, Bonus } from '@game/index';

const OFFSET_COEFF = 0.75;
const PADDING_V = 30;
const PADDING_H = 50;

class MainScene extends Phaser.Scene {
  private player!: Player;
  private finish!: number

  private barrsGrp!: Phaser.Physics.Arcade.Group;
  private bonusGrp!: Phaser.Physics.Arcade.Group;

  private swipe!: Swipe;

  constructor() {
    super('main');
  }

  preload() {
    this.load.image('ice', 'assets/ice.png');
    this.load.image('finish', 'assets/finish.png')
    this.load.image('char', 'assets/char.png');
    this.load.image('bar', 'assets/barrier.png');
    this.load.image('bonus', 'assets/bonus.png');
  }

  create() {
    this.barrsGrp = this.physics.add.group();
    this.bonusGrp = this.physics.add.group();
    this.player = new Player(this);

    Level.init(this, this.bonusGrp, this.barrsGrp);
    this.updateLevel()

    this.physics.add.collider(this.player, this.barrsGrp);
    this.physics.add.overlap(this.player, this.bonusGrp, (_, obj) => {
      const bonus = obj as Bonus;
      this.bonusGrp.remove(bonus);
      bonus.collect();
    });

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    this.swipe = new Swipe(this);
    this.swipe.addListeners({
      onMove: this.player.modifyMotion.bind(this.player),
      onUp: this.player.checkAcceleration.bind(this.player),
    });
  }

  update() {
    if (this.player.body) {
      const { x, y } = this.player.body.velocity;
      const xOffset = Math.min(
        OFFSET_COEFF * x,
        this.scale.height / 2 - PADDING_V,
      );
      const yOffset = Math.min(
        OFFSET_COEFF * y,
        this.scale.height / 2 - PADDING_H,
      );
      this.cameras.main.setFollowOffset(-xOffset, -yOffset);
    }

    if (this.player.y > this.finish) {
      this.player.setVelocity(0)
      this.updateLevel()
    }
  }

  updateLevel() {
    const { width, height } = Level.create();
    this.finish = height - FINISH_OFFSET
    this.player.setPosition(width / 2, 50)
    this.player.setDepth(1)
  }
}

export default MainScene;
