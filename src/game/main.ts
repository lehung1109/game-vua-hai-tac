import { config } from "./config";
import { Game } from "phaser";

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
