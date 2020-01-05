import Phaser from 'phaser';
import { CarPlayer, CarStatic } from './Car';

export default class RacingScene extends Phaser.Scene {
  preload() {
    this.load.image('bg', './assets/bg.png');
    this.load.spritesheet('cars', './assets/cars.png', {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
    
    this.matter.world.setBounds(0, 0, bg.width, bg.height);

    this.player = new CarPlayer(this, bg.width / 2, bg.height / 2, {
      startAngle: 90
    });

    this.cars = this.add.group({
      classType: CarStatic
    });

    const RANDOM = 4;

    for (let i = 0; i < 15; i++) {
      if (Math.random() < 1 / RANDOM) {
        this.cars.create(60, 80 + 16 * i).setAngle(90);
      }
    }

    for (let i = 0; i < 15; i++) {
      if (Math.random() < 1 / RANDOM) {
        this.cars.create(452, 80 + 16 * i).setAngle(-90);
      }
    }

    for (let i = 0; i < 23; i++) {
      if (Math.random() < 1 / RANDOM) {
        this.cars.create(80 + 16 * i, 324).setAngle(0);
      }
    }

    for (let i = 0; i < 23; i++) {
      if (Math.random() < 1 / RANDOM) {
        this.cars.create(80 + 16 * i, 60).setAngle(180);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / RANDOM) {
        this.cars.create(128 + 16 * i, 132).setAngle(0);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / RANDOM) {
        this.cars.create(128 + 16 * i, 156).setAngle(180);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / RANDOM) {
        this.cars.create(128 + 16 * i, 228).setAngle(0);
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() < 1 / RANDOM) {
        this.cars.create(128 + 16 * i, 252).setAngle(180);
      }
    }

    const camera = this.cameras.main;
    camera.setBounds(0, 0, bg.width, bg.height);
    camera.startFollow(this.player);
  }
}
