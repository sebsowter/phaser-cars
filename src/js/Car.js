import Phaser from 'phaser';
import Inputs from './Inputs';

export class SkidMark extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 4, 1, 0x333333);
  }
}

export class CarContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, frame = 1) {
    const chasis = new Phaser.GameObjects.Sprite(scene, 0, 0, 'cars', frame);
    const chasisLength = 16;
    const chasisWidth = 8;
    const wheels = [];
    
    for (let iy = 0; iy < 2; iy++) {
      for (let ix = 0; ix < 2; ix++) {
        const wx = -chasisWidth / 2 + ix * chasisWidth;
        const wy = -(chasisLength / 2 - 2) + (iy * (chasisLength - 2 * 2));
        const wheel = new Phaser.GameObjects.Rectangle(scene, wx, wy, 2, 4, 0x000000);

        wheels.push(wheel);
      }
    }

    super(scene, x, y, wheels.concat([chasis]));

    this.wheels = wheels;
    this.chasis = chasis;
    this.setSize(chasisWidth, chasisLength);
    this.scene.add.existing(this);
    this.scene.matter.add.gameObject(this);
    this.setDepth(2);
  }
}

export class CarPlayer extends CarContainer {
  constructor(scene, x, y) {
    super(scene, x, y, 0);
    
    this.setData('angularGrip', 0.05);
    this.setData('grip', 0.05);
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
    const angularGrip = this.getData('angularGrip');
    const angularDrag = 1 - angularGrip;
    const grip = this.getData('grip');
    const drag = 1 - grip;
    const powerReverse = this.getData('powerReverse');
    const power = this.getData('power');
    const turnMax = this.getData('turnMax');
    const turnRate = this.getData('turnRate');
    const velocityPrevX = this.body.position.x - this.body.positionPrev.x;
    const velocityPrevY = this.body.position.y - this.body.positionPrev.y;
    
    let wheelAngle = this.getData('wheelAngle');
    let angularVelocity = this.body.angularVelocity * angularDrag;
    let speed = this.body.speed;
    let throttle = 0;

    if (this.inputs.left) {
      wheelAngle = Math.max(wheelAngle - turnRate, -turnMax);
      
      if (speed > 0.1) {
        angularVelocity += wheelAngle / (10 + angularDrag * 190);
      }
    } else if (this.inputs.right) {
      wheelAngle = Math.min(wheelAngle + turnRate, turnMax);
      
      if (speed > 0.1) {
        angularVelocity += wheelAngle / (10 + angularDrag * 190);
      }
    } else if (wheelAngle > 0) {
      wheelAngle = Math.max(wheelAngle - turnRate, 0);
    } else if (wheelAngle < 0) {
      wheelAngle = Math.min(wheelAngle + turnRate, 0);
    }

    if (this.inputs.up) {
      throttle = power;
    } else if (this.inputs.down) {
      throttle = -powerReverse;
      speed = -speed;
    }

    const velocity = new Phaser.Math.Vector2(
      velocityPrevX * drag + Math.sin(this.rotation) * (speed * grip + throttle),
      velocityPrevY * drag - Math.cos(this.rotation) * (speed * grip + throttle)
    );

    this.setVelocity(velocity.x, velocity.y);
    this.setAngularVelocity(angularVelocity);
    this.setData('wheelAngle', wheelAngle);

    this.wheels[0].setRotation(wheelAngle);
    this.wheels[1].setRotation(wheelAngle);

    if (Math.abs(this.body.angularVelocity) > 0.025 && Math.abs(this.body.speed) > 2) {
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
    super(scene, x, y);
  }
}
