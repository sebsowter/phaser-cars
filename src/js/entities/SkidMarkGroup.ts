import { SkidMark } from "./";

export default class SkidMarkGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene, null, {
      classType: SkidMark,
    });
  }

  public draw(x: number, y: number, rotation: number): void {
    for (let i = -1; i < 2; i += 2) {
      this.create(
        x + Math.sin(rotation) * (i * 4) - Math.cos(rotation) * 6,
        y - Math.cos(rotation) * (i * 4) - Math.sin(rotation) * 6
      ).setRotation(rotation);
    }
  }
}
