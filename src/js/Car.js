import Phaser from 'phaser';
import Inputs from './Inputs';

export class SkidMark extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 4, 1, 0x333333);
  }
}

export class CarContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, frame) {
    const chassis = new Phaser.GameObjects.Sprite(scene, 0, 0, 'cars', frame);
    const chassisLength = 16;
    const chassisWidth = 8;
    const wheels = [];
    
    for (let iy = 0; iy < 2; iy++) {
      for (let ix = 0; ix < 2; ix++) {
        const wx = -chassisWidth / 2 + ix * chassisWidth;
        const wy = -(chassisLength / 2 - 2) + (iy * (chassisLength - 2 * 2));
        const wheel = new Phaser.GameObjects.Rectangle(scene, wx, wy, 2, 4, 0x000000);

        wheels.push(wheel);
      }
    }

    super(scene, x, y, wheels.concat([chassis]));

    this.wheels = wheels;
    this.chassis = chassis;
    this.setSize(chassisWidth, chassisLength);
    this.scene.add.existing(this);
    this.scene.matter.add.gameObject(this);
    this.setDepth(2);
  }
}

export class CarPlayer extends CarContainer {
  constructor(scene, x, y) {
    super(scene, x, y, 0);
    
    this.setData('angularGrip', 0.05);
    this.setData('grip', 0.02);
    this.setData('power', 0.075);
    this.setData('powerReverse', 0.025);
    this.setData('turnMax', 40 * Phaser.Math.DEG_TO_RAD);
    this.setData('turnRate', 20 * Phaser.Math.DEG_TO_RAD);
    this.setData('wheelAngle', 0);

    this.skidMarks = this.scene.add.group({
      classType: SkidMark
    });

    this.inputs = new Inputs(this.scene);
  }

  preUpdate() { 
    const WHEEL_COEFFICIENT = 1 / 10;
    const powerForward = this.getData('power');
    const powerReverse = this.getData('powerReverse');
    const turnMax = this.getData('turnMax');
    const turnRate = this.getData('turnRate');
    const grip = this.getData('grip');
    const drag = 1 - grip;
    const angularGrip = this.getData('angularGrip');
    const angularDrag = 1 - angularGrip;
    const velocityPrev = new Phaser.Math.Vector2(
      this.body.position.x - this.body.positionPrev.x,
      this.body.position.y - this.body.positionPrev.y,
    );

    let wheelAngle = this.getData('wheelAngle');
    let angularVelocity = this.body.angularVelocity * angularDrag;
    let speed = this.body.speed;
    let power = 0;

    if (this.inputs.up) {
      power = powerForward;
    } else if (this.inputs.down) {
      power = -powerReverse;
      speed = -speed;
    }

    if (this.inputs.left) {
      wheelAngle = Math.max(wheelAngle - turnRate, -turnMax);
      
      if (this.body.speed > 0.1) {
        angularVelocity += (speed < 0 ? -1 : 1) * wheelAngle * WHEEL_COEFFICIENT * angularGrip;
      }
    } else if (this.inputs.right) {
      wheelAngle = Math.min(wheelAngle + turnRate, turnMax);
      
      if (this.body.speed > 0.1) {
        angularVelocity += (speed < 0 ? -1 : 1) * wheelAngle * WHEEL_COEFFICIENT * angularGrip;
      }
    } else if (wheelAngle > 0) {
      wheelAngle = Math.max(wheelAngle - turnRate, 0);
    } else if (wheelAngle < 0) {
      wheelAngle = Math.min(wheelAngle + turnRate, 0);
    }

    const velocity = new Phaser.Math.Vector2(
      velocityPrev.x * drag + Math.sin(this.rotation) * (speed * grip + power),
      velocityPrev.y * drag - Math.cos(this.rotation) * (speed * grip + power)
    );

    this.setVelocity(velocity.x, velocity.y);
    this.setAngularVelocity(angularVelocity);
    this.setData('wheelAngle', wheelAngle);

    this.wheels[0].setRotation(wheelAngle);
    this.wheels[1].setRotation(wheelAngle);

    if (Math.abs(this.body.angularVelocity) > 0.025 && Math.abs(this.body.speed) > 1) {
      const position = new Phaser.Math.Vector2(
        this.x + Math.sin(this.body.angle) * -6,
        this.y - Math.cos(this.body.angle) * -6
      );
      const rotation = Math.atan2(
        this.body.positionPrev.y - this.body.position.y,
        this.body.positionPrev.x - this.body.position.x
      );

      this.skidMarks.create(
        position.x - Math.cos(this.body.angle) * 4,
        position.y + Math.sin(this.body.angle) * 4,
      ).setRotation(rotation);
      this.skidMarks.create(
        position.x - Math.cos(this.body.angle) * -4,
        position.y + Math.sin(this.body.angle) * -4,
      ).setRotation(rotation);
    }
  }
}

export class CarStatic extends CarContainer {
  constructor(scene, x, y) {
    super(scene, x, y, 1);
  }
}
