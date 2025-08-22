import { fetchWithProgress } from "@/utils/network";
import { Scene } from "phaser";

export class Loading extends Scene {
  private name?: string;
  private progressText!: Phaser.GameObjects.Text;

  constructor() {
    super("Loading");

    this.name = "loading";
  }

  async create() {
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
    const data = await fetchWithProgress(
      `/api/scene/${this.name}/blob`,
      {
        method: "GET",
      },
      this.updateProgress.bind(this)
    );

    console.log(data);

    // this.scene.start("SelectCharacter");
  }

  updateProgress(percent: number) {
    this.progressText.setText(`Initializing... ${Math.round(percent * 100)}%`);
  }
}
