import { Player } from "../models/player";
import { Enemy, Chicken } from "../models/enemy";
import { Bullet } from "../models/bullet";
import moveAllMovables from "./movingbulletsControl";
import { areRectanglesColliding } from "@/helper functions/checkRectanglesCollide";
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
    Object.keys(keysPressed.current).forEach((key) => {
      if (keysPressed.current[key]) {
        this.pressButton(key);
      }
    });
    moveAllMovables(
      this.bullets,
      this.stateObject.setBulletState,
      this.enemies.chickens,
      this.stateObject.setChickensState
    );
  }

  startGame() {
    // thi start game should be done with another level engin to controll the levels lol

    // set chicken

    const chickensArray = [];

    for (let i = 0; i < 10; i++) {
      const x = 100 + i * 120; // spacing between chickens
      const y = 100; // same Y for a horizontal row
      const chicken = new Chicken(x, y);
      this.enemies.chickens.push(chicken);
      chickensArray.push({ x: chicken._posX, y: chicken._posy });
    }

    this.stateObject.setChickensState(chickensArray);

    //set player
    const player = new Player(5);
    player.setbullettype("red");
    this.player = player;
    this.stateObject.setPlayerState({
      x: this.player._posX,
      y: this.player._posy,
    });
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
