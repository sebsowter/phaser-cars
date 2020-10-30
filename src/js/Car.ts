import Inputs from "./Inputs";

export type MatterGameObject = Phaser.GameObjects.Container &
  Phaser.Physics.Matter.Components.Bounce &
  Phaser.Physics.Matter.Components.Collision &
  Phaser.Physics.Matter.Components.Force &
  Phaser.Physics.Matter.Components.Friction &
  Phaser.Physics.Matter.Components.Gravity &
  Phaser.Physics.Matter.Components.Mass &
  Phaser.Physics.Matter.Components.Sensor &
  Phaser.Physics.Matter.Components.SetBody &
  Phaser.Physics.Matter.Components.Sleep &
  Phaser.Physics.Matter.Components.Static &
  Phaser.Physics.Matter.Components.Transform &
  Phaser.Physics.Matter.Components.Velocity;

export class SkidMark extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 4, 1, 0x333333);
  }
}

export class CarContainer extends Phaser.GameObjects.Container {
  public body: MatterJS.BodyType;
  public wheels: Phaser.GameObjects.Rectangle[];
  public chassis: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, frame: number) {
    const chassis = new Phaser.GameObjects.Sprite(scene, 0, 0, "cars", frame);
    const chassisLength = 16;
    const chassisWidth = 8;
    const wheels = [];

    for (let iy = 0; iy < 2; iy++) {
      for (let ix = 0; ix < 2; ix++) {
        const wx = -chassisWidth / 2 + ix * chassisWidth;
        const wy = -(chassisLength / 2 - 2) + iy * (chassisLength - 2 * 2);
        const wheel = new Phaser.GameObjects.Rectangle(
          scene,
          wx,
          wy,
          2,
          4,
          0x000000
        );

        wheels.push(wheel);
      }
    }

    super(scene, x, y, wheels.concat([chassis]));

    this.wheels = wheels;
    this.chassis = chassis;

    this.scene.add.existing(this);
    this.scene.matter.add.gameObject(this);

    this.setSize(chassisWidth, chassisLength);
    this.setDepth(2);
  }
}

export class CarPlayer extends CarContainer {
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
  }

  public preUpdate(): void {
    const WHEEL_COEFFICIENT = 1 / 10;
    const SPEED_MIN = 0.1;
    const [
      wheelAngle,
      powerForward,
      powerReverse,
      turnMax,
      turnRate,
      grip,
      angularGrip,
    ] = this.getData([
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

    let angle = wheelAngle;
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
      angle = Math.min(
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
      angle =
        wheelAngle > 0
          ? Math.max(wheelAngle - turnRate, 0)
          : Math.min(wheelAngle + turnRate, 0);
    }

    const velocity = new Phaser.Math.Vector2(
      velocityPrev.x * drag + Math.sin(this.rotation) * (speed * grip + power),
      velocityPrev.y * drag - Math.cos(this.rotation) * (speed * grip + power)
    );

    const matter = (this as any) as MatterGameObject;
    matter.setVelocity(velocity.x, velocity.y);
    matter.setAngularVelocity(angularVelocity);
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

export class CarStatic extends CarContainer {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 1);
  }
}
