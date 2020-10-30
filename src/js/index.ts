import "phaser";
import GameScene from "./GameScene";
import LoaderScene from "./LoaderScene";

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 224,
  zoom: 3,
  pixelArt: true,
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
