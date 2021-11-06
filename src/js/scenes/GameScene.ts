import Inputs from "../inputs/Inputs";
import { CarPlayer, CarStatic } from "../entities";

export default class GameScene extends Phaser.Scene {
  public inputs: Inputs;
  public road: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: "game",
      active: false,
      visible: false,
    });
  }

  public init() {
    this.inputs = new Inputs(this);
  }

  public create() {
    const RANDOM = 4;
    const WALL_WIDTH = 32;

    const { width, height } = this.add.image(0, 0, "bg").setOrigin(0, 0);
    const player = new CarPlayer(this, width / 2, height / 2);

    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.startFollow(player, true);

    this.matter.world.setBounds(
      WALL_WIDTH,
      WALL_WIDTH,
      width - WALL_WIDTH * 2,
      height - WALL_WIDTH * 2
    );

    this.road = new Phaser.GameObjects.Graphics(this);
    this.road.lineStyle(1, 0x333333);
    this.road.setDepth(1);

    this.add.existing(this.road);

    // Add cars.
    const cars = this.add.group({
      classType: CarStatic,
    });

    for (let i = 0; i < 15; i++) {
      if (Math.random() < 1 / RANDOM) {
        cars.create(60, 80 + 16 * i).setAngle(0);
      }
    }

    for (let i = 0; i < 15; i++) {
      if (Math.random() < 1 / RANDOM) {
        cars.create(452, 80 + 16 * i).setAngle(180);
      }
    }

    for (let i = 0; i < 23; i++) {
      if (Math.random() < 1 / RANDOM) {
        cars.create(80 + 16 * i, 324).setAngle(-90);
      }
    }

    for (let i = 0; i < 23; i++) {
      if (Math.random() < 1 / RANDOM) {
        cars.create(80 + 16 * i, 60).setAngle(90);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / RANDOM) {
        cars.create(128 + 16 * i, 132).setAngle(-90);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / RANDOM) {
        cars.create(128 + 16 * i, 156).setAngle(90);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / RANDOM) {
        cars.create(128 + 16 * i, 228).setAngle(-90);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / RANDOM) {
        cars.create(128 + 16 * i, 252).setAngle(90);
      }
    }
  }
}
