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

    const options = {
      skidMarkColor: 0x333333
    };

    this.player = new CarPlayer(this, bg.width / 2, bg.height / 2, 90, {
      ...options,
      texture: 'cars',
      frame: 2
    });

    const RANDOM = 3;

    for (let i = 0; i < 15; i++) {
      if (Math.random() * RANDOM < 1) {
        new CarStatic(this, 60, 80 + 16 * i, 90, {
          ...options
        });
      }
    }

    for (let i = 0; i < 15; i++) {
      if (Math.random() * RANDOM < 1) {
        new CarStatic(this, 452, 80 + 16 * i, -90, {
          ...options
        });
      }
    }

    for (let i = 0; i < 23; i++) {
      if (Math.random() * RANDOM < 1) {
        new CarStatic(this, 80 + 16 * i, 324, 0, {
          ...options
        });
      }
    }

    for (let i = 0; i < 23; i++) {
      if (Math.random() * RANDOM < 1) {
        new CarStatic(this, 80 + 16 * i, 60, 180, {
          ...options
        });
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() * RANDOM < 1) {
        new CarStatic(this, 128 + 16 * i, 132, 0, {
          ...options
        });
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() * RANDOM < 1) {
        new CarStatic(this, 128 + 16 * i, 156, 180, {
          ...options
        });
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() * RANDOM < 1) {
        new CarStatic(this, 128 + 16 * i, 228, 0, {
          ...options
        });
      }
    }

    for (let i = 0; i < 17; i++) {
      if (Math.random() * RANDOM < 1) {
        new CarStatic(this, 128 + 16 * i, 252, 180, {
          ...options
        });
      }
    }

    const camera = this.cameras.main;
    camera.setBounds(0, 0, bg.width, bg.height);
    camera.startFollow(this.player);
    //camera.setRoundPixels(true);
  }
}
