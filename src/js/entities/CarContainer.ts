export default class CarContainer extends Phaser.GameObjects.Container {
  public wheels: Phaser.GameObjects.Rectangle[];
  public chassis: Phaser.GameObjects.Sprite;
  public sprite: Phaser.Physics.Matter.Sprite;
  public body: MatterJS.BodyType;

  constructor(scene: Phaser.Scene, x: number, y: number, frame: number) {
    super(scene, x, y);

    const CHASSIS_LENGTH = 16;
    const CHASSIS_WIDTH = 8;

    this.chassis = new Phaser.GameObjects.Sprite(scene, 0, 0, "cars", frame);
    this.wheels = [];

    for (let iy = 0; iy < 2; iy++) {
      for (let ix = 0; ix < 2; ix++) {
        const wx = -CHASSIS_WIDTH / 2 + ix * CHASSIS_WIDTH;
        const wy = -(CHASSIS_LENGTH / 2 - 2) + iy * (CHASSIS_LENGTH - 2 * 2);

        this.wheels.push(
          new Phaser.GameObjects.Rectangle(scene, wx, wy, 2, 4, 0x000000)
        );
      }
    }

    this.add(this.wheels);
    this.add(this.chassis);
    this.setSize(CHASSIS_WIDTH, CHASSIS_LENGTH);
    this.setDepth(2);

    this.scene.add.existing(this);
    this.sprite = this.scene.matter.add.gameObject(
      this
    ) as Phaser.Physics.Matter.Sprite;
  }
}
