import { Bullet, RedBullet } from "./bullet";
class Player {
  _posX = 100;
  _posy = 100;
  _width = 50;
  _height = 50;
  _power = 1;
  _food = 0;
  _lastshot = 0;
  _speed;
  _bullettype;
  _coolDown = 1000;
  constructor(speed) {
    this._speed = speed;
  }
  setbullettype(bullettype) {
    this._bullettype = bullettype;
    if (bullettype == "red") {
      this._coolDown = 200;
    }
    // her is will set the cooldown too ya rab ma ansa
  }
  shoot() {
    if (Date.now() - this._lastshot > this._coolDown) {
      this._lastshot = Date.now();
      console.log("shoot");
      if (this._bullettype == "red") {
        const newbullet = new RedBullet(
          this._posX + this._width / 2,
          this._posy,
          90
        );
        return newbullet;
      }
    } else {
      return null;
    }
  }
  rocket() {}

  move(character) {
    if (character == "a") {
      this._posX -= this._speed;
      if (this._posX < 0) {
        this._posX = 0;
      }
    }
    if (character == "d") {
      this._posX += this._speed;
      if (this._posX > 1500) {
        this._posX = 1500;
      }
    }
    if (character == "w") {
      this._posy -= this._speed;
      if (this._posy < 0) {
        this._posy = 0;
      }
    }
    if (character == "s") {
      this._posy += this._speed;
      if (this._posy > 680) {
        this._posy = 680;
      }
    }
  }

  die() {}
}
export { Player };
