import { GameScene } from "../scenes";
import { CarProps } from "../types";
import { CarContainer } from "./";

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
    const WHEEL_COEFFICIENT = 1 / 10;
    const SPEED_MIN = 0.1;
    const { left, right, up, down } = this.scene.inputs;
    const [
      powerForward,
      powerReverse,
      turnMax,
      turnRate,
      grip,
      drag,
      angularGrip,
      angularDrag,
    ] = this.getData([
      "powerForward",
      "powerReverse",
      "turnMax",
      "turnRate",
      "grip",
      "drag",
      "angularGrip",
      "angularDrag",
    ]);

    let angularVelocity = this.body.angularVelocity * angularDrag;
    let speed = this.body.speed;
    let power = 0;

    if (up) {
      power = powerForward;
    } else if (down) {
      power = -powerReverse;
      speed = -speed;
    }

    if (left || right) {
      const angularCoefficient = Math.sign(Math.floor(speed / SPEED_MIN));

      this.wheelAngle = Math.min(
        Math.max(this.wheelAngle + (left ? -turnRate : turnRate), -turnMax),
        turnMax
      );

      angularVelocity +=
        angularCoefficient * this.wheelAngle * WHEEL_COEFFICIENT * angularGrip;
    } else if (this.wheelAngle !== 0) {
      this.wheelAngle =
        this.wheelAngle > 0
          ? Math.max(this.wheelAngle - turnRate, 0)
          : Math.min(this.wheelAngle + turnRate, 0);
    }

    const velocityPrev = new Phaser.Math.Vector2(
      this.body.position.x - this.body.positionPrev.x,
      this.body.position.y - this.body.positionPrev.y
    );
    const velocity = new Phaser.Math.Vector2(
      velocityPrev.x * drag + Math.cos(this.rotation) * (speed * grip + power),
      velocityPrev.y * drag + Math.sin(this.rotation) * (speed * grip + power)
    );

    this.sprite.setVelocity(velocity.x, velocity.y);
    this.sprite.setAngularVelocity(angularVelocity);

    for (let i = 0; i < 2; i++) {
      this.wheels[i].setRotation(this.wheelAngle);
    }

    if (Math.abs(angularVelocity) > 0.025 && Math.abs(speed) > 1) {
      this.scene.skidMarks.draw(
        new Phaser.Math.Vector2(this.x, this.y),
        this.rotation
      );
    }
  }

  public set wheelAngle(value: number) {
    this.setData("wheelAngle", value);
  }

  public get wheelAngle(): number {
    return this.getData("wheelAngle");
  }
}
