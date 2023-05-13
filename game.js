class Road extends AdventureScene {
  constructor() {
    super("road", "Road");
  }

  onEnter() {
    this.cameras.main.setBackgroundColor(0x5f5f5f);

    let door = this.add.text(this.w * 0.28, this.h * 0.3, "🚪")
      .setFontSize(this.s * 20)
      .setInteractive()
      .on('pointerover', () => {
        this.showMessage("Hotel Entrance.");
      })
      .on('pointerdown', () => {
        this.showMessage("*squeak*");
        door.setText("🚪");
        this.gotoScene('lobby');
      })

    let tree = this.add.text(this.w * 0.02, this.w * 0.3, "🌳")
      .setFontSize(this.s * 20)
      .setInteractive()
      .on('pointerover', () => {
        this.showMessage("An ordinary tree.");
      })

    let tree2 = this.add.text(this.w * 0.52, this.w * 0.3, "🌳")
      .setFontSize(this.s * 20)
      .setInteractive()
      .on('pointerover', () => {
        this.showMessage("An ordinary tree.");
      })
    
  }
}

class Lobby extends AdventureScene {
  constructor() {
    super("lobby", "Hotel Lobby");
  }

  onEnter() {
    this.cameras.main.setBackgroundColor (0x964B00);

    let clip = this.add.text(this.w * 0.1, this.w * 0.3, "🔪")
      .setFontSize(this.s * 10)
      .setInteractive()
      .on('pointerover', () => this.showMessage("An ordinary kitchen knife, it is covered with blood."))
      .on('pointerdown', () => {
        this.showMessage("I better not touch the evidence.");
        this.tweens.add({
          targets: clip,
          x: '+=' + this.s,
          repeat: 2,
          yoyo: true,
          ease: 'Sine.inOut',
          duration: 100
        });
      });

    let key = this.add.text(this.w * 0.5, this.w * 0.3, "🔑")
      .setFontSize(this.s * 10)
      .setInteractive()
      .on('pointerover', () => {
        this.showMessage("A hotel room key, it says \"217\" on it.")
      })
      .on('pointerdown', () => {
        this.showMessage("You obtained Room Key 217.");
        this.gainItem('key');
        this.tweens.add({
          targets: key,
          y: `-=${2 * this.s}`,
          alpha: { from: 1, to: 0 },
          duration: 500,
          onComplete: () => key.destroy()
        });
      })

    let door = this.add.text(this.w * 0.02, this.w * 0.1, "🚪")
      .setFontSize(this.s * 10)
      .setInteractive()
      .on('pointerover', () => {
        if (this.hasItem("key")) {
          this.showMessage("The door is locked.");
        } else {
          this.showMessage("Room 217.");
        }
      })
      .on('pointerdown', () => {
        if (this.hasItem("key")) {
          this.loseItem("key");
          this.showMessage("*squeak*");
          door.setText("🚪");
          this.gotoScene('room');
        }
      })

    let door2 = this.add.text(this.w * 0.22, this.w * 0.1, "🚪")
      .setFontSize(this.s * 10)
      .setInteractive()
      .on('pointerover', () => {
        this.showMessage("Room 218.");
      })

    let door3 = this.add.text(this.w * 0.42, this.w * 0.1, "🚪")
      .setFontSize(this.s * 10)
      .setInteractive()
      .on('pointerover', () => {
        this.showMessage("Room 219.");
      })

    let door4 = this.add.text(this.w * 0.62, this.w * 0.1, "🚪")
      .setFontSize(this.s * 10)
      .setInteractive()
      .on('pointerover', () => {
        this.showMessage("Room 219.");
      })

  }
}

class Room extends AdventureScene {
  constructor() {
    super("room", "Room 217.");
  }
  onEnter() {
    this.add.text(this.w * 0.02, this.w * 0.3, "🚪")
      .setFontSize(this.s * 20)
      .setInteractive()
      .on('pointerover', () => {
        this.showMessage("Return to hotel lobby.");
      })
      .on('pointerdown', () => {
        this.gotoScene('lobby');
      });

    let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
      .setInteractive()
      .on('pointerover', () => {
        this.showMessage('*giggles*');
        this.tweens.add({
          targets: finish,
          x: this.s + (this.h - 2 * this.s) * Math.random(),
          y: this.s + (this.h - 2 * this.s) * Math.random(),
          ease: 'Sine.inOut',
          duration: 500
        });
      })
      .on('pointerdown', () => this.gotoScene('outro'));
  }
}

class Intro extends Phaser.Scene {
  constructor() {
    super('intro')
  }
  create() {
    this.add.text(50, 50, "Murder Case Detective").setFontSize(100);
    this.add.text(50, 150, "Click to start.").setFontSize(40);
    this.input.on('pointerdown', () => {
      this.cameras.main.fade(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => this.scene.start('road'));
    });
  }
}

class Outro extends Phaser.Scene {
  constructor() {
    super('outro');
  }
  create() {
    this.add.text(50, 50, "Case Ended.").setFontSize(50);
    this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
    this.input.on('pointerdown', () => this.scene.start('intro'));
  }
}

const game = new Phaser.Game({
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080
  },
  scene: [Intro, Road, Lobby, Room, Outro],
  title: "Murder Case Detective",
});

