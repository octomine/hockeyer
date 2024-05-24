import { Player, Barrier, Swipe, Bonus } from "@game/index"

const WORLD_PADDINGS = 50
const OFFSET_COEFF = .75
const PADDING_V = 30
const PADDING_H = 50

class MainScene extends Phaser.Scene {
  private player!: Player

  private barGrp!: Phaser.Physics.Arcade.Group
  private bonusGrp!: Phaser.Physics.Arcade.Group

  private swipe!: Swipe

  constructor() {
    super('main')
  }

  preload() {
    this.load.image('ice', 'assets/ice.png')
    this.load.image('char', 'assets/char.png')
    this.load.image('bar', 'assets/barrier.png')
    this.load.image('bonus', 'assets/bonus.png')
  }

  create() {
    const { width, height } = this.add.image(0, 0, 'ice').setOrigin(0)
    const textureCopies = 5
    const h = height * textureCopies
    for (let i = 0; i < textureCopies; i++) {
      this.add.image(0, i * height, 'ice').setOrigin(0)
    }

    this.physics.world.setBounds(0, 0, width, h)

    this.player = new Player(this)
    this.player.setPosition(width / 2, 50)

    this.barGrp = this.physics.add.group()
    this.physics.add.collider(this.player, this.barGrp)

    this.bonusGrp = this.physics.add.group()
    this.physics.add.overlap(this.player, this.bonusGrp, (player, bonus) => {
      console.log(player);
      const cBonus = bonus as Bonus
      this.bonusGrp.remove(cBonus)
      cBonus.collect()
    })

    this.cameras.main.setBounds(-WORLD_PADDINGS, -WORLD_PADDINGS, width + 2 * WORLD_PADDINGS, h + 2 * WORLD_PADDINGS)
    this.cameras.main.startFollow(this.player, true, .05, .05)

    this.swipe = new Swipe(this)
    this.swipe.addListeners({
      onMove: this.player.modifyMotion.bind(this.player),
      onUp: this.player.checkAcceleration.bind(this.player)
    })

    // this.updateBars()
    this.addBonus(width)
  }

  update() {
    if (this.player.body) {
      const { x, y } = this.player.body.velocity
      const xOffset = Math.min(OFFSET_COEFF * x, (this.scale.height / 2) - PADDING_V)
      const yOffset = Math.min(OFFSET_COEFF * y, (this.scale.height / 2) - PADDING_H)
      this.cameras.main.setFollowOffset(-xOffset, -yOffset)
    }
  }

  // ---
  updateBars() {
    this.barGrp.clear(true, true)
    const { width, height } = this.scale;
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(0, width)
      const y = Phaser.Math.Between(0, height)
      const bar = this.physics.add.existing(new Barrier(this, x, y))
      this.barGrp.add(bar)
    }
  }

  addBonus(w: number) {
    const x = w / 2
    const y = 200
    const step = 50
    for (let i = 0; i < 5; i++) {
      const bonus = new Bonus(this, x, y + i * step)
      this.bonusGrp.add(bonus)
    }
  }
}

export default MainScene
