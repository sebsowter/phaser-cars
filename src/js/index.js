import Phaser from 'phaser';
import GameScene from './GameScene';

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 224,
  zoom: 3,
  pixelArt: true,
  input: {
    queue: true
  },
  physics: {
    default: 'matter',
    matter: {
      debug: false,
      gravity: {
        y: 0
      }
    }
  },
  scene: GameScene
};

const game = new Phaser.Game(config);
