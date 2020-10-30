export default class Inputs {
  private scene: Phaser.Scene;
  private keys: any;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.keys = this.scene.input.keyboard.addKeys("W,A,S,D,up,left,down,right");
  }

  public get up(): boolean {
    return this.keys.up.isDown || this.keys.W.isDown || this.padA || this.padB;
  }

  public get down(): boolean {
    return this.keys.down.isDown || this.keys.S.isDown;
  }

  public get left(): boolean {
    return this.keys.left.isDown || this.keys.A.isDown || this.getPadH(true);
  }

  public get right(): boolean {
    return this.keys.right.isDown || this.keys.D.isDown || this.getPadH(false);
  }

  public get padA(): boolean {
    return (
      this.pad &&
      this.pad.buttons.some(
        (button) => button.index % 2 === 0 && button.value === 1
      )
    );
  }

  public get padB(): boolean {
    return (
      this.pad &&
      this.pad.buttons.some(
        (button) => button.index % 2 === 1 && button.value === 1
      )
    );
  }

  public getPadH(isLeft: boolean): boolean {
    return this.pad && this.pad.axes[0].getValue() === (isLeft ? -1 : 1);
  }

  public getPadV(isUp: boolean): boolean {
    return this.pad && this.pad.axes[1].getValue() === (isUp ? -1 : 1);
  }

  public get pad(): Phaser.Input.Gamepad.Gamepad {
    const pad = this.scene.input.gamepad;

    if (pad && pad.gamepads && pad.gamepads.length) {
      return pad.gamepads[0];
    }

    return null;
  }
}
