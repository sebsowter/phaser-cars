import { GameScene } from "../scenes";
import CarContainer from "./CarContainer";

interface CarType {
  angularGrip: number;
  grip: number;
  powerForward: number;
  powerReverse: number;
  turnMax: number;
  turnRate: number;
}

export default class CarPlayer extends CarContainer {
  public scene: GameScene;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y);

    const props: CarType = {
      angularGrip: 0.05,
      grip: 0.02,
      powerForward: 0.03,
      powerReverse: 0.015,
      turnMax: 40 * Phaser.Math.DEG_TO_RAD,
      turnRate: 10 * Phaser.Math.DEG_TO_RAD,
    };

    this.setData({
      ...props,
      drag: 1 - props.grip,
      angularDrag: 1 - props.angularGrip,
      wheelAngle: 0,
    });
  }

  public preUpdate() {
    const TURN_COEFFICIENT = 0.1;
    const SPEED_MIN = 0.1;

    const { left, right, accelerator, breaks } = this.scene.inputs;
    const { speed, position, positionPrev, angularVelocity } = this.body;
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

    const speedNew = breaks ? -speed : speed;
    const power = accelerator ? powerForward : breaks ? -powerReverse : 0;

    // Set velocity.
    const velocity = new Phaser.Math.Vector2(
      (position.x - positionPrev.x) * drag +
        Math.cos(this.rotation) * (speedNew * grip + power),
      (position.y - positionPrev.y) * drag +
        Math.sin(this.rotation) * (speedNew * grip + power)
    );

    this.sprite.setVelocity(velocity.x, velocity.y);

    // Set angular velocity.
    let angle = wheelAngle;
    let angularVelocityNew = angularVelocity * angularDrag;

    if (left || right) {
      const angularCoefficient =
        Math.sign(Math.floor(speedNew / SPEED_MIN)) * TURN_COEFFICIENT;
      const angularRate = (left ? -1 : 1) * turnRate;

      angle = Math.min(Math.max(angle + angularRate, -turnMax), turnMax);
      angularVelocityNew += angularCoefficient * angle * angularGrip;
    } else if (angle !== 0) {
      angle = Math.sign(angle) * Math.min(Math.abs(angle) + turnRate, 0);
    }

    this.sprite.setAngularVelocity(angularVelocityNew);

    // Set wheel rotation.
    const [wheel1, wheel2] = this.wheels;

    wheel1.setRotation(angle);
    wheel2.setRotation(angle);

    this.setData("wheelAngle", angle);

    // Draw tyre marks.
    if (Math.abs(angularVelocity) > 0.03 && Math.abs(speedNew) > 0.5) {
      const v1 = new Phaser.Math.Vector2(2, 0);
      const v2 = new Phaser.Math.Vector2(5, 0);
      const v3 = new Phaser.Math.Vector2(6, 0);

      v1.setAngle(this.rotation);
      v3.setAngle(this.rotation);
      v2.setAngle(this.rotation + Math.PI / 2);

      this.scene.road.strokeLineShape(
        new Phaser.Geom.Line(
          this.x - v1.x - v2.x - v3.x,
          this.y - v1.y - v2.y - v3.y,
          this.x + v1.x - v2.x - v3.x,
          this.y + v1.y - v2.y - v3.y
        )
      );

      this.scene.road.strokeLineShape(
        new Phaser.Geom.Line(
          this.x - v1.x + v2.x - v3.x,
          this.y - v1.y + v2.y - v3.y,
          this.x + v1.x + v2.x - v3.x,
          this.y + v1.y + v2.y - v3.y
        )
      );
    }
  }
}
