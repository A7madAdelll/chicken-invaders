import { Player } from "../models/player";
import { Enemy, Chicken } from "../models/enemy";
import { Bullet } from "../models/bullet";
import moveAllBullets from "./movingbulletsControl";
import moveAllChickens from "./chickenFloatingControll";
import { areRectanglesColliding } from "@/helper functions/checkRectanglesCollide";
import { Level1 } from "@/models/subLevel";
class EnginController {
  _screenWidth = 1550;
  _screenHeight = 730;

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
  }

  calculateOneFrame(keysPressed) {
    // console.log("calculate one frame");

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

    //set level 1
    const level1 = new Level1();
    const chickensArray = level1.getLevel();
    console.log("first chickens", chickensArray);

    this.enemies.chickens = chickensArray;
    const newChickensState = [];

    for (let i = 0; i < chickensArray.length; i++) {
      newChickensState.push({
        x: chickensArray[i]._posX,
        y: chickensArray[i]._posy,
      });
    }
    console.log(newChickensState);

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
}
export { EnginController };
