import { GetSceneBlobResponse } from "@/app/api/scene/[id]/blob/route";
import { Scene } from "phaser";

export class SelectCharacter extends Scene {
  currentText: string;
  inputName?: Phaser.GameObjects.Image;
  inputText?: Phaser.GameObjects.Text;
  caretPadding: number;
  caret?: Phaser.GameObjects.Text;
  caretAnimation?: Phaser.Tweens.Tween;
  inputKeydownEvent?: Phaser.Input.Keyboard.KeyboardPlugin;
  inputBlurEvent?: Phaser.Input.InputPlugin;
  inputKeydownCallbackBind?: (event: KeyboardEvent) => void;
  blurInputCallbackBind?: (
    pointer: Phaser.Input.Pointer,
    targets: Phaser.GameObjects.GameObject[]
  ) => void;
  buttonEnterGame?: Phaser.GameObjects.Sprite;
  bgObject?: Phaser.GameObjects.Image;

  constructor() {
    super("SelectCharacter");
    this.currentText = "Name";
    this.caretPadding = 2;
  }

  private assets?: GetSceneBlobResponse;

  init(data: { assets: GetSceneBlobResponse }) {
    this.assets = data.assets;
  }

  preload() {
    // load all url in assets with name is filename in url
    this.assets?.items.forEach((item) => {
      const url = new URL(item.url);
      const filename = url.pathname.split("/").pop();

      if (filename === "21_btn_enterGame.png") {
        this.load.spritesheet(filename, item.url, {
          frameWidth: 210,
          frameHeight: 66,
        });
      } else if (filename) {
        this.load.image(filename, item.url);
      } else {
        console.error("No filename found in url", item.url);
      }
    });
  }

  create() {
    const { width, height } = this.scale;

    this.bgObject = this.add
      .image(width / 2, height / 2, "17_createRole_bg.jpg")
      .setOrigin(0.5, 0.5);

    // make sure height of bg is 100%
    this.bgObject.setScale(height / this.bgObject.height);
    this.bgObject.setX(width / 2);

    // set input name
    this.inputName = this.add
      .image(0, 0, "25_txt_name_input_bg.png")
      .setOrigin(0.5, 0.5);

    this.inputName.displayWidth = this.bgObject.displayWidth * 0.2;
    this.inputName.displayHeight = this.bgObject.displayHeight * 0.05;

    this.inputName.setX(width / 2);
    this.inputName.setY(this.bgObject.displayHeight * 0.81);

    this.inputName.on("pointerover", () => {
      this.input.setDefaultCursor("text");
    });

    this.inputName.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });

    this.createInteractiveForInput();
    this.createEnterGameButton();
  }

  createEnterGameButton() {
    if (!this.bgObject) {
      console.error("Background object not found");
      return;
    }

    this.buttonEnterGame = this.add
      .sprite(0, 0, "21_btn_enterGame.png", 2)
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    this.buttonEnterGame.setScale((this.bgObject.displayHeight * 0.08) / 66);
    this.buttonEnterGame.setX(this.scale.width / 2);
    this.buttonEnterGame.setY(this.bgObject.displayHeight * 0.9);

    // hover event
    this.buttonEnterGame.on("pointerover", () => {
      if (this.currentText.length > 0) {
        this.buttonEnterGame?.setFrame(1);
      }
    });

    // pointer out event
    this.buttonEnterGame.on("pointerout", () => {
      this.updateFrameForEnterGameButton();
    });
  }

  createInteractiveForInput() {
    this.inputName?.setInteractive();
    this.createInputTextIfNotExists();
    this.inputName?.on("pointerdown", () => {
      this.createCaretIfNotExists();
      this.listenForInput();
      this.listenForBlur();
    });
  }

  listenForBlur() {
    if (!this.inputName) {
      console.error("Input name not found");
      return;
    }

    if (!this.inputBlurEvent) {
      this.blurInputCallbackBind =
        this.blurInputCallbackBind || this.blurInputCallback.bind(this);
      this.inputBlurEvent = this.input.on(
        "pointerdown",
        this.blurInputCallbackBind
      );
    }
  }

  blurInputCallback(
    pointer: Phaser.Input.Pointer,
    targets: Phaser.GameObjects.GameObject[]
  ) {
    if (
      this.inputName &&
      !targets.includes(this.inputName) &&
      this.inputText &&
      !targets.includes(this.inputText)
    ) {
      // stop caret animation
      this.caretAnimation?.pause();
      this.caret?.setVisible(false);

      // remove some event listener
      this.input.keyboard?.off("keydown", this.inputKeydownCallbackBind);
      this.input.off("pointerdown", this.blurInputCallbackBind);
      this.inputKeydownEvent = undefined;
      this.inputBlurEvent = undefined;
    }
  }

  listenForInput() {
    if (!this.inputKeydownEvent) {
      this.inputKeydownCallbackBind =
        this.inputKeydownCallbackBind || this.inputKeydownCallback.bind(this);
      this.inputKeydownEvent = this.input.keyboard?.on(
        "keydown",
        this.inputKeydownCallbackBind
      );
    }
  }

  inputKeydownCallback(event: KeyboardEvent) {
    if (event.key === "Backspace") {
      this.currentText = this.currentText.slice(0, -1);
    } else if (this.currentText.length >= 20) {
      this.errorInput("Max length is 20");
    } else if (event.key.length === 1 || event.key.length === 2) {
      this.currentText += event.key;
    }

    // set text for input
    this.inputText?.setText(this.currentText);
    this.updateCaretPosition();

    this.updateFrameForEnterGameButton();
  }

  updateFrameForEnterGameButton() {
    if (this.currentText.length > 0) {
      this.buttonEnterGame?.setFrame(0);
    } else {
      this.buttonEnterGame?.setFrame(2);
    }
  }

  errorInput(message: string) {
    alert(message);
  }

  createInputTextIfNotExists() {
    if (!this.inputName) {
      console.error("Input name not found");
      return;
    }

    if (!this.inputText) {
      this.inputText = this.add
        .text(this.inputName.x, this.inputName.y, this.currentText, {
          fontSize: "24px",
          color: "#999", // color for placeholder
        })
        .setOrigin(0.5, 0.5);
      this.inputText.setInteractive();
      this.inputText.on("pointerdown", () => {
        // trigger input name pointer down
        this.inputName?.emit("pointerdown", this.inputText);
      });
    } else {
      // set color to white
      this.inputText.setColor("#fff");
    }
  }

  createCaretIfNotExists() {
    if (!this.inputText) {
      console.error("Input text not found");
      return;
    }

    if (!this.caret) {
      this.caret = this.add
        .text(
          this.inputText?.x + this.inputText?.width / 2 + this.caretPadding,
          this.inputText?.y,
          "|",
          {
            fontSize: "24px",
            color: "#fff",
          }
        )
        .setOrigin(0.5, 0.5);
    } else {
      this.caret.setVisible(true);
      this.updateCaretPosition();
    }

    // animation to toggle caret
    if (!this.caretAnimation) {
      this.caretAnimation = this.tweens.add({
        targets: this.caret,
        alpha: 0,
        duration: 500,
        ease: "Power2",
        repeat: -1,
        yoyo: true,
      });
    } else {
      this.caretAnimation.restart();
    }
  }

  updateCaretPosition() {
    if (!this.inputText) {
      console.error("Input text not found");
      return;
    }

    this.caret?.setX(
      this.inputText.x + this.inputText.width / 2 + this.caretPadding
    );
  }
}
