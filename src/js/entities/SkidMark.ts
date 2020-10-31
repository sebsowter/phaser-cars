export default class SkidMark extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 4, 3, 0x333333);
  }
}
