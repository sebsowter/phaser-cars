import Inputs from "../inputs/Inputs";
import { CarPlayer, CarStatic, SkidMarkGroup } from "../entities";

export default class GameScene extends Phaser.Scene {
  public inputs: Inputs;
  public skidMarks: SkidMarkGroup;

  constructor() {
    super({
      key: "game",
      active: false,
      visible: false,
    });
  }

  public init(): void {
    this.inputs = new Inputs(this);
    this.skidMarks = new SkidMarkGroup(this).setDepth(1);
  }

  public create(): void {
    const random = 4;
    const wallWidth = 32;
    const bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
    const { width, height } = bg;
    const player = new CarPlayer(this, width / 2, height / 2);
    const cars = this.add.group({
      classType: CarStatic,
    });

    for (let i = 0; i < 15; i++) {
      if (Math.random() < 1 / random) {
        cars.create(60, 80 + 16 * i).setAngle(0);
      }
    }

    for (let i = 0; i < 15; i++) {
      if (Math.random() < 1 / random) {
        cars.create(452, 80 + 16 * i).setAngle(180);
      }
    }

    for (let i = 0; i < 23; i++) {
      if (Math.random() < 1 / random) {
        cars.create(80 + 16 * i, 324).setAngle(-90);
      }
    }

    for (let i = 0; i < 23; i++) {
      if (Math.random() < 1 / random) {
        cars.create(80 + 16 * i, 60).setAngle(90);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / random) {
        cars.create(128 + 16 * i, 132).setAngle(-90);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / random) {
        cars.create(128 + 16 * i, 156).setAngle(90);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / random) {
        cars.create(128 + 16 * i, 228).setAngle(-90);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / random) {
        cars.create(128 + 16 * i, 252).setAngle(90);
      }
    }

    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.startFollow(player, true);
    this.matter.world.setBounds(
      wallWidth,
      wallWidth,
      width - wallWidth * 2,
      height - wallWidth * 2
    );
  }
}
