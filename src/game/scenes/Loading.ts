import { Scene } from "phaser";

export class Loading extends Scene {
  constructor() {
    super("Loading");
  }

  preload() {
    console.log("preload");
    this.load.setBaseURL(
      "https://qqvwjajuohipjesi.public.blob.vercel-storage.com/scenes/loading/"
    );
    this.load.image("xa_thu_img", "1_xa_thu_img.png");

    // this.load.setBaseURL("/");
    // this.load.image("background", "assets/bg.png");
  }

  create() {
    this.scene.start("SelectCharacter");
  }
}
