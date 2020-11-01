import { GameScene } from "../scenes";
import { CarProps } from "../types";
import CarContainer from "./CarContainer";

export default class CarPlayer extends CarContainer {
  public scene: GameScene;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 0);

    const props: CarProps = {
      angularGrip: 0.05,
      grip: 0.02,
      powerForward: 0.075,
      powerReverse: 0.025,
      turnMax: 40 * Phaser.Math.DEG_TO_RAD,
      turnRate: 20 * Phaser.Math.DEG_TO_RAD,
    };

    this.setData({
      ...props,
      drag: 1 - props.grip,
      angularDrag: 1 - props.angularGrip,
      wheelAngle: 0,
    });
  }

  public preUpdate(): void {
    const TURN_COEFFICIENT = 1 / 10;
    const SPEED_MIN = 0.1;
    const { left, right, accelerator, breaks } = this.scene.inputs;
    const [
      wheelAngle,
      powerForward,
      powerReverse,
      turnMax,
      turnRate,
      grip,
      drag,
      angularGrip,
      angularDrag,
    ] = this.getData([
      "wheelAngle",
      "powerForward",
      "powerReverse",
      "turnMax",
      "turnRate",
      "grip",
      "drag",
      "angularGrip",
      "angularDrag",
    ]);

    const speed = breaks ? -this.body.speed : this.body.speed;
    const power = accelerator ? powerForward : breaks ? -powerReverse : 0;
    const velocity = new Phaser.Math.Vector2(
      (this.body.position.x - this.body.positionPrev.x) * drag +
        Math.cos(this.rotation) * (speed * grip + power),
      (this.body.position.y - this.body.positionPrev.y) * drag +
        Math.sin(this.rotation) * (speed * grip + power)
    );

    this.sprite.setVelocity(velocity.x, velocity.y);

    let angle = wheelAngle;
    let angularVelocity = this.body.angularVelocity * angularDrag;

    if (left || right) {
      const angularCoefficient =
        Math.sign(Math.floor(speed / SPEED_MIN)) * TURN_COEFFICIENT;
      const angularRate = (left ? -1 : 1) * turnRate;

      angle = Math.min(Math.max(angle + angularRate, -turnMax), turnMax);
      angularVelocity += angularCoefficient * angle * angularGrip;
    } else if (angle !== 0) {
      angle = Math.sign(angle) * Math.min(Math.abs(angle) + turnRate, 0);
    }

    this.sprite.setAngularVelocity(angularVelocity);

    for (let i = 0; i < 2; i++) {
      this.wheels[i].setRotation(angle);
    }

    this.setData("wheelAngle", angle);

    if (Math.abs(angularVelocity) > 0.025 && Math.abs(speed) > 1) {
      this.scene.skidMarks.draw(this.x, this.y, this.rotation);
    }
  }
}
