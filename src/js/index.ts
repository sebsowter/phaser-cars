import "phaser";
import LoaderScene from "./scenes/LoaderScene";
import GameScene from "./scenes/GameScene";

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
    antialias: false,
    antialiasGL: false,
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

window.addEventListener("load", function () {
  const game = new Phaser.Game(config);
});
