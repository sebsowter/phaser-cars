import "phaser";
import { LoaderScene, GameScene } from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 256,
  height: 224,
  zoom: 3,
  input: {
    keyboard: true,
    gamepad: true,
  },
  render: {
    pixelArt: true,
  },
  physics: {
    default: "matter",
    matter: {
      debug: false,
      gravity: {
        y: 0,
      },
    },
  },
  scene: [LoaderScene, GameScene],
};

export const game = new Phaser.Game(config);
