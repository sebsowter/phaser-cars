export default class LoaderScene extends Phaser.Scene {
  public preload() {
    this.load.image("bg", "./assets/bg.png");
    this.load.spritesheet("cars", "./assets/cars.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  public create() {
    this.scene.start("game");
  }
}
