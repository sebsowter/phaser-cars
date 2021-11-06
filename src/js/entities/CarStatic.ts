import CarContainer from "./CarContainer";

export default class CarStatic extends CarContainer {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 1);
  }
}
