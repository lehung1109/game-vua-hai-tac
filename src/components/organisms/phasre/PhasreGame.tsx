"use client";

import { useLayoutEffect, useRef } from "react";
import StartGame from "@game/main";
import { EventBus } from "@game/EventBus";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

const PhaserGame = () => {
  const game = useRef<Phaser.Game | null>(null!);

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = StartGame("game-container");
    }

    EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
      console.log(scene_instance);
    });

    return () => {
      if (game.current) {
        game.current.destroy(true);

        if (game.current !== null) {
          game.current = null;
        }
      }

      EventBus.removeListener("current-scene-ready");
    };
  }, []);

  return <div id="game-container"></div>;
};

export default PhaserGame;
