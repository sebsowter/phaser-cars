import Phaser from 'phaser';
import Scene from './Scene';

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 224,
  zoom: 3,
  pixelArt: true,
  physics: {
    default: 'matter',
    matter: {
      debug: false,
      gravity: {
        y: 0
      }
    }
  },
  scene: Scene
};

const game = new Phaser.Game(config);
