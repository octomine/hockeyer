class Entity extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x = 0, y = 0, texture = '', frame = 0) {
    super(scene, x, y, texture, frame);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }

  protected getBody() {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}

export default Entity;
