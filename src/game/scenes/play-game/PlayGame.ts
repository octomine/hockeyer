import store, { increaseTime, setIsPlaying, showMessage } from '@app/slices';
import Level from '@app/game/level/Level';
import { Player, Swipe, Bonus } from '@game/index';
import { UIMessage } from '@app/slices/types';

const OFFSET_COEFF = 0.75;
const PADDING_V = 30;
const PADDING_H = 50;

class PlayGame extends Phaser.Scene {
  private player!: Player;

  private background!: Phaser.GameObjects.TileSprite;
  private finish!: Phaser.GameObjects.TileSprite;
  private barrsGrp!: Phaser.Physics.Arcade.Group;
  private bonusGrp!: Phaser.Physics.Arcade.Group;

  private swipe!: Swipe;

  private isPlaying = false;
  private level!: number;

  private debTxt!: Phaser.GameObjects.Text;

  constructor() {
    super('main');
  }

  preload() {
    this.load.image('ice', 'assets/ice.png');
    this.load.image('finish', 'assets/finish.png');
    this.load.image('char', 'assets/char.png');
    this.load.image('bar', 'assets/barrier.png');
    this.load.image('bonus', 'assets/bonus.png');
  }

  create() {
    this.background = this.add.tileSprite(0, 0, 0, 0, 'ice').setOrigin(0);
    this.finish = this.add.tileSprite(0, 0, 0, 30, 'finish').setOrigin(0);
    this.barrsGrp = this.physics.add.group();
    this.bonusGrp = this.physics.add.group();
    this.player = new Player(this);

    Level.init(
      this,
      this.background,
      this.finish,
      this.bonusGrp,
      this.barrsGrp,
    );

    this.updateLevel();

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

    store.subscribe(this.onStoreChange.bind(this));

    this.debTxt = this.add.text(0, 0, 'deb', {
      color: '#000000',
      fontSize: '20px',
    });
  }

  update() {
    // calculate offsets for camera
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

    // time counting
    if (this.isPlaying) {
      store.dispatch(increaseTime());
    }

    // check finish
    if (this.player.y > this.finish.y && this.isPlaying) {
      this.player.break();
      store.dispatch(setIsPlaying(false));
      store.dispatch(showMessage(UIMessage.LevelFinish));
    }

    // deb
    this.debTxt.setPosition(this.player.x - 15, this.player.y + 20);
  }

  updateLevel() {
    const { width } = Level.create();
    this.player.setPosition(width / 2, 50);
    this.player.setDepth(1);
    this.player.resetDrag();
    this.player.setVelocity(0);
  }

  onStoreChange() {
    const { isPlaying } = store.getState().game;
    this.isPlaying = isPlaying;

    const { level } = store.getState().level;
    if (this.level !== level) {
      this.updateLevel();
      this.level = level;
    }
  }

  public deb(msg: string) {
    this.debTxt.setText(msg);
  }
}

export default PlayGame;
