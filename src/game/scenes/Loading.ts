import { fetchWithProgress } from "@/utils/network";
import { Scene } from "phaser";

export class Loading extends Scene {
  private name?: string;
  private progressText?: Phaser.GameObjects.Text;
  private progressPercent = 0;

  constructor() {
    super("Loading");

    this.name = "loading";
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 1);

    this.progressText = this.add
      .text(width / 2, height / 2, "Initializing...0%", {
        fontSize: "32px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    // call api to get assets and load them
    fetchWithProgress(
      `/api/scene/${this.name}/blob`,
      {
        method: "GET",
      },
      this.updateProgress.bind(this)
    )
      .then(() => {
        this.scene.start("SelectCharacter");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateProgress(percent: number) {
    this.progressPercent = percent;
  }

  update() {
    this.progressText?.setText(
      `Initializing... ${Math.round(this.progressPercent * 100)}%`
    );
  }
}
