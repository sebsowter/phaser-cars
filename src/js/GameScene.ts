import { CarPlayer, CarStatic } from "./Car";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "game",
      active: false,
      visible: false,
    });
  }

  public create(): void {
    const random = 4;
    const wallWidth = 16;
    const bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
    const player = new CarPlayer(this, bg.width / 2, bg.height / 2).setAngle(
      90
    );
    const cars = this.add.group({
      classType: CarStatic,
    });

    for (let i = 0; i < 15; i++) {
      if (Math.random() < 1 / random) {
        cars.create(60, 80 + 16 * i).setAngle(90);
      }
    }

    for (let i = 0; i < 15; i++) {
      if (Math.random() < 1 / random) {
        cars.create(452, 80 + 16 * i).setAngle(-90);
      }
    }

    for (let i = 0; i < 23; i++) {
      if (Math.random() < 1 / random) {
        cars.create(80 + 16 * i, 324).setAngle(0);
      }
    }

    for (let i = 0; i < 23; i++) {
      if (Math.random() < 1 / random) {
        cars.create(80 + 16 * i, 60).setAngle(180);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / random) {
        cars.create(128 + 16 * i, 132).setAngle(0);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / random) {
        cars.create(128 + 16 * i, 156).setAngle(180);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / random) {
        cars.create(128 + 16 * i, 228).setAngle(0);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / random) {
        cars.create(128 + 16 * i, 252).setAngle(180);
      }
    }

    console.log("player", player);

    const camera = this.cameras.main;
    camera.setBounds(0, 0, bg.width, bg.height);
    camera.startFollow(player, true);

    /*
    const camera = this.cameras.main;
    camera.setBounds(0, 0, bg.width, bg.height);
    camera.startFollow(player);
    console.log("bg", bg);
    this.cameras.main.setBounds(0, 0, bg.width, bg.height);
    this.cameras.main.startFollow(player);

    this.matter.world.setBounds(
      wallWidth,
      wallWidth,
      bg.width - wallWidth * 2,
      bg.height - wallWidth * 2
    );
    */
  }
}
