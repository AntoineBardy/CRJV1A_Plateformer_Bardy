import Player from "../class/player.js";

export default class Game extends Phaser.Scene {
    constructor()
      {
          super('game')
      }
  
    preload() {
        //Preloading Images, Textures and Maps
      this.load.spritesheet(
        "player",
        "../assets/Hero.png",
        {
          frameWidth: 32,
          frameHeight: 32,
          margin: 1,
          spacing: 2
        }
      );
      this.load.image("tile", "../assets/TileSet.png");
      this.load.tilemapTiledJSON("map", "../assets/Map.json");
    }
  
    create() {
      //Setting the state of the player
      this.isPlayerDead = false;
  
  
      //Setting the map
      const map = this.make.tilemap({ key: "map" });
      const tiles = map.addTilesetImage("TileSet", "tile");
  
      this.ground = map.createLayer("Plateforme", tiles);
      map.createLayer("Decor", tiles);
      this.mortel = map.createLayer("Mortel", tiles);
  
      // Using Spawn Point to get an easy way to spawn player
      const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
      this.player = new Player(this, spawnPoint.x, spawnPoint.y);
  
      // Collide the player with Tiled Layers
      this.ground.setCollisionByProperty({ collides: true });
      this.physics.world.addCollider(this.player.sprite, this.ground);
  
      this.mortel.setCollisionByProperty({ mortal: true });
  
      // Spawning the ennemies and define their IA
  
      // Colliding them with player and others
  
      //Creating others elements and colling them if needed
  
  
      //Setting the camera
      this.cameras.main.startFollow(this.player.sprite);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }
  
    update(time, delta) {
      if (this.isPlayerDead) return;
  
      this.player.update();
  
      if (
        this.physics.world.overlap(this.player.sprite, this.mortel)
      ) {
        // Flag that the player is dead
        this.isPlayerDead = true;
  
        const cam = this.cameras.main;
        cam.shake(100, 0.05);
        cam.fade(250, 0, 0, 0);
  
        // Freeze the player
        this.player.freeze();
  
        // Add an effect on death
        cam.once("camerafadeoutcomplete", () => {
          this.player.destroy();
          this.scene.restart();
        });
      }
    }
  }