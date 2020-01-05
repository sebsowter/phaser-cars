import Phaser from 'phaser';
import Inputs from './Inputs';

export class SkidMark extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 4, 1, 0x000000);
  }
}

export class CarWheel extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, wheelWidth, wheelDiameter) {
    super(scene, x, y, wheelWidth, wheelDiameter, 0x000000);
  }
}

export class CarChasis extends Phaser.GameObjects.Sprite {
  constructor(scene, texture, frame) {
    super(scene, 0, 0, texture, frame);
  }
}

export class CarContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, startAngle = 0, {
    angularGrip = 0.05,
    chasisWidth = 8,
    chasisLength = 16,
    frame = 0,
    friction = 0.1,
    frictionAir = 0.01,
    frictionStatic = 0.5,
    grip = 0.05,
    power = 0.08,
    reverseMax = 10,
    skidMarkColor = 0x333333,
    speedMax = 2,
    texture = 'cars',
    turnRate = 20 * Phaser.Math.DEG_TO_RAD,
    turnMax = 40 * Phaser.Math.DEG_TO_RAD,
    wheelDiameter = 4,
    wheelDistance = 2,
    wheelWidth = 2,
  }) {
    const chasis = new CarChasis(scene, texture, frame);
    const wheels = [];

    for (let iy = 0; iy < 2; iy++) {
      for (let ix = 0; ix < 2; ix++) {
        const wx = -chasisWidth / 2 + ix * chasisWidth;
        const wy = -(chasisLength / 2 - wheelDistance) + (iy * (chasisLength - wheelDistance * 2));
        const wheel = new CarWheel(scene, wx, wy, wheelWidth, wheelDiameter);
        
        wheels.push(wheel);
      }
    }

    super(scene, x, y, wheels.concat([chasis]));
    
    this.setData('grip', grip);
    this.setData('speedMax', speedMax);
    this.setData('angularGrip', angularGrip);
    this.setData('reverseMax', reverseMax);
    this.setData('power', power);
    this.setData('drag', speedMax * 4);
    this.setData('turnMax', turnMax);
    this.setData('turnRate', turnRate);
    this.setData('wheelAngle', 0);
    this.setSize(chasisWidth, chasisLength);

    this.scene.add.existing(this);
    this.scene.matter.add.gameObject(this);

    this.setDepth(10);
    this.setAngle(startAngle);
    this.setFriction(friction, frictionAir, frictionStatic);

    this.wheels = wheels;
    this.chasis = chasis;

    this.skidMarks = new Phaser.GameObjects.Group(scene, null, {
      classType: SkidMark,
      createCallback: function(skidMark) {
        skidMark.setFillStyle(skidMarkColor);
      }
    });
    this.scene.add.existing(this.skidMarks);
  }

  preUpdate() {
    const wheelAngle = this.getData('wheelAngle');

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

export class CarPlayer extends CarContainer {
  constructor(scene, x, y, startAngle, options) {
    super(scene, x, y, startAngle, options);
    this.inputs = new Inputs(this.scene);
  }

  preUpdate() {
    const POWER = this.getData('power');
    const TURN_MAX = this.getData('turnMax');
    const TURN_RATE = this.getData('turnRate');
    const GRIP = this.getData('grip');
    const DRAG = 1 - GRIP;
    const ANGULAR_GRIP = this.getData('angularGrip');
    const ANGULAR_DRAG = 1 - ANGULAR_GRIP;
    const velocityPrevX = this.body.position.x - this.body.positionPrev.x;
    const velocityPrevY = this.body.position.y - this.body.positionPrev.y;
    
    let wheelAngle = this.getData('wheelAngle');
    let angularVelocity = this.body.angularVelocity * ANGULAR_DRAG;
    let power = 0;

    if (this.inputs.up) {
      power = POWER;
    } else if (this.inputs.down) {
      power = -POWER;
    }

    if (this.inputs.left) {
      wheelAngle = Math.max(wheelAngle - TURN_RATE, -TURN_MAX);
      
      if (this.body.speed > 0.1) {
        angularVelocity += wheelAngle / (10 + (ANGULAR_DRAG * 190));
      }
    } else if (this.inputs.right) {
      wheelAngle = Math.min(wheelAngle + TURN_RATE, TURN_MAX);
      
      if (this.body.speed > 0.1) {
        angularVelocity += wheelAngle / (10 + (ANGULAR_DRAG * 190));
      }
    } else if (wheelAngle > 0) {
      wheelAngle = Math.max(wheelAngle - TURN_RATE, 0);
    } else if (wheelAngle < 0) {
      wheelAngle = Math.min(wheelAngle + TURN_RATE, 0);
    }

    const velocityX = (velocityPrevX * DRAG) + Math.sin(this.rotation) * (this.body.speed * GRIP + power);
    const velocityY = (velocityPrevY * DRAG) - Math.cos(this.rotation) * (this.body.speed * GRIP + power);

    this.setVelocity(velocityX, velocityY);
    this.setAngularVelocity(angularVelocity);
    this.setData('wheelAngle', wheelAngle);

    super.preUpdate();
  }
}

export class CarStatic extends CarContainer {
  constructor(scene, x, y, startAngle, options) {
    super(scene, x, y, startAngle, {
      ...options,
      texture: 'cars',
      frame: 1,
      chasisLength: 14
    });
  }
}
