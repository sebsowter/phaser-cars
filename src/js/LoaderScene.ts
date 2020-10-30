export default class LoaderScene extends Phaser.Scene {
  public preload(): void {
    this.load.image("bg", "./assets/bg.png");
    this.load.spritesheet("cars", "./assets/cars.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  public create(): void {
    this.scene.start("game");
  }
}
