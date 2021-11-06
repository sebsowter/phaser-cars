interface Keys {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
}

export default class Inputs {
  private scene: Phaser.Scene;
  private keys: Keys;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.keys = this.scene.input.keyboard.addKeys(
      "W,A,S,D,up,left,down,right"
    ) as Keys;
  }

  public get accelerator(): boolean {
    return this.keys.up.isDown || this.keys.W.isDown || this.padA;
  }

  public get breaks(): boolean {
    return this.keys.down.isDown || this.keys.S.isDown || this.padB;
  }

  public get left(): boolean {
    return this.keys.left.isDown || this.keys.A.isDown || this.padAxisH === -1;
  }

  public get right(): boolean {
    return this.keys.right.isDown || this.keys.D.isDown || this.padAxisH === 1;
  }

  private get padA(): boolean {
    return this.padButtons.some(
      (button) => button.index % 2 === 0 && button.value === 1
    );
  }

  private get padB(): boolean {
    return this.padButtons.some(
      (button) => button.index % 2 === 1 && button.value === 1
    );
  }

  private get padAxisH(): number {
    if (this.pad) {
      const [x] = this.pad.axes;

      return x.getValue();
    }

    return 0;
  }

  private get padAxisV(): number {
    if (this.pad) {
      const [_, y] = this.pad.axes;

      return y.getValue();
    }

    return 0;
  }

  private get padButtons(): Phaser.Input.Gamepad.Button[] {
    return this.pad?.buttons || [];
  }

  private get pad(): Phaser.Input.Gamepad.Gamepad {
    const pad = this.scene.input.gamepad;

    if (pad.gamepads.length) {
      const [pad1] = pad.gamepads;

      return pad1;
    }

    return;
  }
}
