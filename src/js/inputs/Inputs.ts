export default class Inputs {
  private scene: Phaser.Scene;
  private keys: any;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.keys = this.scene.input.keyboard.addKeys("W,A,S,D,up,left,down,right");
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
      (button: Phaser.Input.Gamepad.Button) =>
        button.index % 2 === 0 && button.value === 1
    );
  }

  private get padB(): boolean {
    return this.padButtons.some(
      (button: Phaser.Input.Gamepad.Button) =>
        button.index % 2 === 1 && button.value === 1
    );
  }

  private get padAxisH(): number {
    if (this.pad) {
      return this.pad.axes[0].getValue();
    }

    return 0;
  }

  private get padAxisV(): number {
    if (this.pad) {
      return this.pad.axes[1].getValue();
    }

    return 0;
  }

  private get padButtons(): Phaser.Input.Gamepad.Button[] {
    if (this.pad) {
      return this.pad.buttons;
    }

    return [];
  }

  private get pad(): Phaser.Input.Gamepad.Gamepad {
    const pad = this.scene.input.gamepad;

    if (pad && pad.gamepads && pad.gamepads.length) {
      return pad.gamepads[0];
    }

    return null;
  }
}
