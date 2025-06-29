import { SimpleEgg } from "./egg";
class Enemy {
  _entringphase;
  _firstPosX;
  _firstPosY;
  _posX = 500;
  _posy = 0;
  _width;
  _height;
  _killable;
  _health;
  _speed;
  _entranceobj;
  _eggType;
  setEntrance() {}
  constructor(
    _posX,
    _posy,
    _width,
    _height,
    _killable,
    _health,
    speed,
    _entranceobj,
    _eggType
  ) {
    this._posX = _posX;
    this._posy = _posy;
    this._firstPosX = _posX;
    this._firstPosY = _posy;
    this._width = _width;
    this._height = _height;
    this._killable = _killable;
    this._health = _health;
    this._entringphase = true;
    this._speed = speed;
    this._entranceobj = _entranceobj;
    this._eggType = _eggType;
  }

  chickenfloat() {}
  die() {
    console.log("chicken died");
    // clearInterval(this._moveScriptInterval);
  }
  layEgg() {}
}

class Chicken extends Enemy {
  _floatingDioration = 0;
  _floatingDirection = 1;
  _backing = false;
  _maxFloatingDioration;
  constructor(_posX, _posy, _entranceobj) {
    super(_posX, _posy, 100, 100, true, 4, 0.2, _entranceobj);
    this._floatingDirection = Math.floor(Math.random() * 2) * 2 - 1;
    if (this._floatingDirection == 1) {
      this._maxFloatingDioration = Math.floor(
        Math.floor(Math.random() * 100) + 40
      );
    } else {
      this._maxFloatingDioration = Math.floor(
        Math.floor(Math.random() * -100) - 40
      );
    }

    this._floatingDioration = 0;

    const [x, y] = _entranceobj.setEntrance();

    this._posX = x;
    this._posy = y;
    this._eggType = "simple";
  }
  move() {
    if (this._entringphase) {
      const [newx, newy, entringphase] = this._entranceobj.move();
      this._posX = newx;
      this._posy = newy;
      if (!entringphase) {
        this._entringphase = false;
      }
    } else {
      this.chickenfloat();
    }
  }
  chickenfloat = () => {
    if (this._entringphase) return;
    if (this._backing) {
      this._posX += this._speed * this._floatingDirection;
      if (this._floatingDirection == 1) {
        this._floatingDioration++;
      } else {
        this._floatingDioration--;
      }

      if (Math.abs(this._floatingDioration - 0) <= 1) {
        this._backing = false;
        this._floatingDioration = 0;
        this._maxFloatingDioration = Math.floor(
          Math.floor(Math.random() * -100) - 40
        );
        this._posX = this._firstPosX;
      }
    } else {
      this._posX += this._speed * this._floatingDirection;
      if (this._floatingDirection == 1) {
        this._floatingDioration++;

        if (this._floatingDioration >= this._maxFloatingDioration) {
          this._backing = true;
          this._floatingDirection *= -1;
        }
      } else {
        this._floatingDioration--;

        if (this._floatingDioration <= this._maxFloatingDioration) {
          this._backing = true;
          this._floatingDirection *= -1;
        }
      }
    }
  };

  gothit(damage) {
    if (this._killable) {
      this._health -= damage;
      if (this._health <= 0) {
        this.die();
        return true;
      }
      return false;
    }
  }
  layEgg() {
    if (this._eggType == "simple") {
      const newEgg = new SimpleEgg(
        this._posX + this._width / 2,
        this._posy + this._height
      );
      return newEgg;
    }
    console.log("lay egg");
  }
}

export { Enemy, Chicken };
