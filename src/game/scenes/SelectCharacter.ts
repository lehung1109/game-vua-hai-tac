import { Scene } from "phaser";

export class SelectCharacter extends Scene {
  constructor() {
    super("SelectCharacter");
  }

  preload() {
    // this.load.image("background", "assets/bg.png");
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2, "Select Character", {
        fontSize: "32px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
  }
}
