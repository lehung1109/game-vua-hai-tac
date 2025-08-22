import { Loading } from "./scenes/Loading";
import { SelectCharacter } from "./scenes/SelectCharacter";
import { AUTO } from "phaser";

export const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: "100%",
  height: "100%",
  parent: "game-container",
  backgroundColor: "#000",
  scene: [Loading, SelectCharacter],
  scale: {
    mode: Phaser.Scale.FIT,
  },
};
