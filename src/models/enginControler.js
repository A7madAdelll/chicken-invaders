import { Player } from "./player";
import { Enemy, Chicken } from "./enemy";
import { Bullet } from "./bullet";
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
  moveAllMovables() {
    let newbulletState = [];
    let i = 0;

    while (i < this.bullets.length) {
      const [x, y] = this.bullets[i].move();

      if (x == undefined || y == undefined) {
        this.bullets.splice(i, 1);
        continue;
      }

      //check for bullet hit something
      for (let j = 0; j < this.enemies.chickens.length; j++) {
        console.log(this.bullets);

        let rect1 = [
          this.enemies.chickens[j]._posX,
          this.enemies.chickens[j]._posy,
          this.enemies.chickens[j]._posX + this.enemies.chickens[j]._width,
          this.enemies.chickens[j]._posy + this.enemies.chickens[j]._height,
        ];
        let rect2 = [
          x,
          y,
          x + this.bullets[i]._width,
          y + this.bullets[i]._height,
        ];

        if (areRectanglesColliding(rect1, rect2)) {
          console.log("bullet hit chicken");

          const isitdead = this.enemies.chickens[j].gothit(
            this.bullets[i]._damage
          );
          if (isitdead) {
            this.enemies.chickens.splice(j, 1);
            this.stateObject.setChickensState((currentState) => {
              return currentState.filter((chicken, index) => index != j);
            });
          }
          this.bullets.splice(i, 1);
          break;
        } else {
          newbulletState.push({
            x: this.bullets[i]._posX,
            y: this.bullets[i]._posy,
          });
        }
      }
      if (this.enemies.chickens.length == 0 && this.bullets.length != 0) {
        newbulletState.push({
          x: this.bullets[i]._posX,
          y: this.bullets[i]._posy,
        });
      }
      i++;
    }

    this.stateObject.setBulletState([...newbulletState]);
  }

  startGame() {
    // thi start game should be done with another level engin to controll the levels lol

    // set chicken

    const chickensArray = [];

    for (let i = 0; i < 5; i++) {
      const x = 100 + i * 120; // spacing between chickens
      const y = 100; // same Y for a horizontal row
      const chicken = new Chicken(x, y);
      this.enemies.chickens.push(chicken);
      chickensArray.push({ x: chicken._posX, y: chicken._posy });
    }

    this.stateObject.setChickensState(chickensArray);

    //set player
    const player = new Player(10);
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
