export default class CarContainer extends Phaser.GameObjects.Container {
  public chassis: Phaser.GameObjects.Sprite;
  public wheels: Phaser.GameObjects.Rectangle[];
  public sprite: Phaser.Physics.Matter.Sprite;
  public body: MatterJS.BodyType;

  constructor(scene: Phaser.Scene, x: number, y: number, frame: number = 0) {
    super(scene, x, y);

    const CHASSIS_LENGTH = 16;
    const CHASSIS_WIDTH = 8;
    const AXEL_WIDTH = CHASSIS_WIDTH + 2;
    const AXEL_LENGTH = CHASSIS_LENGTH - 6;

    this.chassis = new Phaser.GameObjects.Sprite(scene, 0, 0, "cars", frame);
    this.wheels = [];

    for (let iy = 0; iy < 2; iy++) {
      for (let ix = 0; ix < 2; ix++) {
        const wheel = new Phaser.GameObjects.Rectangle(
          scene,
          AXEL_LENGTH / 2 - iy * AXEL_LENGTH,
          -AXEL_WIDTH / 2 + ix * AXEL_WIDTH,
          4,
          2,
          0x000000
        );

        this.wheels.push(wheel);
      }
    }

    this.add(this.wheels);
    this.add(this.chassis);
    this.setSize(CHASSIS_LENGTH, CHASSIS_WIDTH);
    this.setDepth(2);

    this.scene.add.existing(this);

    this.sprite = this.scene.matter.add.gameObject(
      this
    ) as Phaser.Physics.Matter.Sprite;
  }
}
