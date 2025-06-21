import { Player } from "./player";
import { Enemy } from "./enemy";
import { Bullet } from "./bullet";
class EnginController {
  _screenWidth = 1550;
  _screenHeight = 730;

  constructor(_screenWidth, _screenHeight, stateObject) {
    this.stateObject = stateObject;
    this._screenWidth = _screenWidth;
    this._screenHeight = _screenHeight;
    this.bullets = [];
    this.enemies = [];

    this.player = null;
  }
  moveAllMovables() {
    let newbulletState = [];
    for (let i = 0; i < this.bullets.length; i++) {
      const [x, y] = this.bullets[i].move();
      if (x == undefined || y == undefined) {
        continue;
      }

      newbulletState.push({
        x: this.bullets[i]._posX,
        y: this.bullets[i]._posy,
      });
    }

    this.stateObject.setBulletState([...newbulletState]); // ensure new reference
  }

  startGame() {
    const player = new Player(10);
    player.setbullettype("red");
    this.player = player;
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
      character == "s"
    ) {
      this.player.move(character);
      this.stateObject.setPlayerState({
        x: this.player._posX,
        y: this.player._posy,
      });
    }
  }
}
export { EnginController };
