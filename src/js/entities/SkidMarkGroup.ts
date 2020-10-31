import { SkidMark } from "./";

export default class SkidMarkGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene, [], {
      classType: SkidMark,
    });
  }

  public draw(position: Phaser.Math.Vector2, rotation: number): void {
    for (let i = -1; i < 2; i += 2) {
      this.create(
        position.x + Math.sin(rotation) * (i * 4) - Math.cos(rotation) * 6,
        position.y - Math.cos(rotation) * (i * 4) - Math.sin(rotation) * 6
      ).setRotation(rotation);
    }
  }
}
