import Menu from "./scenes/menu.js";
import Game from "./scenes/game.js";
import SecondWorld from "./scenes/2ndWorld.js"


const config = {
  type: Phaser.AUTO,
  width: 896,
  height: 448,
  parent: "game-container",
  pixelArt: true,
  backgroundColor: "#1d212d",
  scene: [Menu, Game, SecondWorld],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 }
    }
  }
};

const game = new Phaser.Game(config);