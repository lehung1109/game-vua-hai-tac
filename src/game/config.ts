import { Boot } from "./scenes/Boot";
import { AUTO } from "phaser";

export const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [Boot],
};
