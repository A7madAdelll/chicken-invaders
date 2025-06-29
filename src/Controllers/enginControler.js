import { Player } from "../models/player";

import moveAllBullets from "./movingbulletsControl";
import moveAllChickens from "./chickenFloatingControll";
import { eggDensityControl } from "./eggsDensity";
import { checkPlayerDeath } from "./checkPlayerDeath";
import { moveAllEggs, makeAChickenLayEgg } from "./moveAllEggs";
import { Level1, Level2, Level3 } from "@/models/subLevel";
class EnginController {
  _screenWidth = 1550;
  _screenHeight = 730;
  _levels;
  _currentLevel;
  _currentLevelIterator = 0;
  _gameRunning = true;
  _lives = 3;
  constructor(_screenWidth, _screenHeight, stateObject) {
    this.stateObject = stateObject;
    this._screenWidth = _screenWidth;
    this._screenHeight = _screenHeight;
    this.bullets = [];
    this.enemies = {
      chickens: [],
      eggs: [],
    };

    this.player = null;
    this._levels = [];
    const lvl1 = new Level1();
    const lvl2 = new Level2();
    const lvl3 = new Level3();
    this._levels.push(lvl1);
    this._levels.push(lvl2);
    this._levels.push(lvl3);

    this._currentLevel = this._levels[this._currentLevelIterator];
  }

  calculateOneFrame(keysPressed) {
    Object.keys(keysPressed.current).forEach((key) => {
      if (keysPressed.current[key]) {
        this.pressButton(key);
      }
    });
    moveAllBullets(
      this.bullets,
      this.stateObject.setBulletState,
      this.enemies.chickens,
      this.stateObject.setChickensState
    );
    moveAllChickens(this.enemies.chickens, this.stateObject.setChickensState);
    makeAChickenLayEgg(
      this._currentLevel,
      this.enemies.chickens,
      this.enemies.eggs
    );
    moveAllEggs(this.enemies.eggs, this.stateObject.setEggState);
    eggDensityControl(this._currentLevel, this.enemies.chickens);
    const isDead = checkPlayerDeath(
      this.player,
      this.enemies.chickens,
      this.enemies.eggs
    );

    if (isDead) {
      this._lives--;
      this.player = new Player(5);
      this.player.setbullettype("red");
      this.stateObject.setPlayerState({
        x: this.player._posX,
        y: this.player._posy,
      });
    }
    if (!this._lives) {
      console.log("you died");
      this.player = null;
      this.stateObject.setPlayerState({});
      this._gameRunning = false;
    }
    if (this._currentLevel.isDone()) {
      if (this._currentLevelIterator == this._levels.length - 1) {
        console.log("you win");
        this._gameRunning = false;
        return false;
      }
      this.getnextLevel();
    }
    if (this._gameRunning) {
      return true;
    } else {
      return false;
    }
  }
  startGame() {
    //set player
    const player = new Player(5);
    player.setbullettype("red");
    this.player = player;
    this.stateObject.setPlayerState({
      x: this.player._posX,
      y: this.player._posy,
    });
    this._currentLevel.startLevel();

    this.enemies.chickens = this._currentLevel.getLevel();
    const newChickensState = [];

    for (let i = 0; i < this.enemies.chickens.length; i++) {
      newChickensState.push({
        x: this.enemies.chickens[i]._posX,
        y: this.enemies.chickens[i]._posy,
      });
    }

    this.stateObject.setChickensState(newChickensState);
  }
  pressButton(character) {
    if (character == " ") {
      const newbullet = this.player.shoot();

      if (newbullet == null) return;

      this.bullets.push(newbullet);
    }
    if (
      character == "a" ||
      character == "d" ||
      character == "w" ||
      character == "s" ||
      character == "ش" ||
      character == "س" ||
      character == "ي" ||
      character == "ص" ||
      character == "A" ||
      character == "S" ||
      character == "W" ||
      character == "D"
    ) {
      this.player.move(character.toLowerCase());
      this.stateObject.setPlayerState({
        x: this.player._posX,
        y: this.player._posy,
      });
    }
  }
  getnextLevel() {
    this._currentLevelIterator++;
    this._currentLevel = this._levels[this._currentLevelIterator];
    this._currentLevel.startLevel();
    this.enemies.chickens = this._currentLevel.getLevel();

    const newChickensState = [];

    for (let i = 0; i < this.enemies.chickens.length; i++) {
      newChickensState.push({
        x: this.enemies.chickens[i]._posX,
        y: this.enemies.chickens[i]._posy,
      });
    }

    this.stateObject.setChickensState(newChickensState);
  }
}
export { EnginController };
