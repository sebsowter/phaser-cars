import CarContainer from "./CarContainer";
import SkidMark from "./SkidMark";
import Inputs from "../inputs/Inputs";

export default class CarPlayer extends CarContainer {
  private skidMarks: Phaser.GameObjects.Group;
  private inputs: Inputs;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 0);

    this.setData({
      angularGrip: 0.05,
      grip: 0.02,
      power: 0.075,
      powerReverse: 0.025,
      turnMax: 40 * Phaser.Math.DEG_TO_RAD,
      turnRate: 20 * Phaser.Math.DEG_TO_RAD,
      wheelAngle: 0,
    });

    this.skidMarks = this.scene.add.group({
      classType: SkidMark,
    });

    this.inputs = new Inputs(this.scene);
    console.log("this.inputs", this.inputs);
  }

  public preUpdate(): void {
    const WHEEL_COEFFICIENT = 1 / 10;
    const SPEED_MIN = 0.1;
    const [
      wheelAngle2,
      powerForward,
      powerReverse,
      turnMax,
      turnRate,
      grip,
      angularGrip,
    ] = this.getData([
      "wheelAngle",
      "power",
      "powerReverse",
      "turnMax",
      "turnRate",
      "grip",
      "angularGrip",
    ]);
    const drag = 1 - grip;
    const angularDrag = 1 - angularGrip;
    const velocityPrev = new Phaser.Math.Vector2(
      this.body.position.x - this.body.positionPrev.x,
      this.body.position.y - this.body.positionPrev.y
    );

    let wheelAngle = wheelAngle2;
    let angularVelocity = this.body.angularVelocity * angularDrag;
    let speed = this.body.speed;
    let power = 0;

    if (this.inputs.up) {
      power = powerForward;
    } else if (this.inputs.down) {
      power = -powerReverse;
      speed = -speed;
    }

    if (this.inputs.left || this.inputs.right) {
      wheelAngle = Math.min(
        Math.max(
          wheelAngle + (this.inputs.left ? -turnRate : turnRate),
          -turnMax
        ),
        turnMax
      );
      angularVelocity +=
        Math.sign(Math.floor(speed / SPEED_MIN)) *
        wheelAngle *
        WHEEL_COEFFICIENT *
        angularGrip;
    } else if (wheelAngle !== 0) {
      wheelAngle =
        wheelAngle > 0
          ? Math.max(wheelAngle - turnRate, 0)
          : Math.min(wheelAngle + turnRate, 0);
    }

    const velocity = new Phaser.Math.Vector2(
      velocityPrev.x * drag + Math.sin(this.rotation) * (speed * grip + power),
      velocityPrev.y * drag - Math.cos(this.rotation) * (speed * grip + power)
    );

    this.sprite.setVelocity(velocity.x, velocity.y);
    this.sprite.setAngularVelocity(angularVelocity);
    this.setData("wheelAngle", wheelAngle);

    this.wheels[0].setRotation(wheelAngle);
    this.wheels[1].setRotation(wheelAngle);

    if (
      Math.abs(this.body.angularVelocity) > 0.025 &&
      Math.abs(this.body.speed) > 1
    ) {
      const position = new Phaser.Math.Vector2(
        this.x + Math.sin(this.body.angle) * -6,
        this.y - Math.cos(this.body.angle) * -6
      );
      const rotation = Math.atan2(
        this.body.positionPrev.y - this.body.position.y,
        this.body.positionPrev.x - this.body.position.x
      );

      this.skidMarks
        .create(
          position.x - Math.cos(this.body.angle) * 4,
          position.y + Math.sin(this.body.angle) * 4
        )
        .setRotation(rotation);
      this.skidMarks
        .create(
          position.x - Math.cos(this.body.angle) * -4,
          position.y + Math.sin(this.body.angle) * -4
        )
        .setRotation(rotation);
    }
  }
}
