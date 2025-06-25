import { secDegEq } from "../helper functions/secDegEq";
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
  _enterfromright = true;

  _xenter;
  _yenter;

  setEntrance() {
    console.log("lool");
  }
  constructor(_posX, _posy, _width, _height, _killable, _health, speed) {
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

    this._enterfromright = Math.random() > 0.5;
    if (this._enterfromright) {
      this._xenter = 50;
    } else {
      this._xenter = -50;
    }
    this._yenter = secDegEq(this._xenter);
  }

  chickenfloat() {}
  die() {
    console.log("chicken died");
    // clearInterval(this._moveScriptInterval);
  }
}

class Chicken extends Enemy {
  _floatingDioration = 0;
  _floatingDirection = 1;
  _backing = false;
  _maxFloatingDioration = 30;
  constructor(_posX, _posy) {
    super(_posX, _posy, 100, 100, true, 4, 0.2);
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
  }
  move() {
    if (this._entringphase) {
      console.log("animation", this._posX, this._posy);

      if (this._enterfromright) {
        this._xenter--;
        this._yenter = secDegEq(this._xenter);

        this._posX = this._firstPosX + this._xenter;
        this._posy = this._firstPosY + this._yenter;

        if (this._posX - this._firstPosX <= 0) {
          this._posX = this._firstPosX;
          this._posy = this._firstPosY;
          this._entringphase = false;
        }
      } else {
        this._xenter++;
        this._yenter = secDegEq(this._xenter);

        this._posX = this._firstPosX + this._xenter;
        this._posy = this._firstPosY + this._yenter;

        if (this._posX - this._firstPosX >= 0) {
          this._posX = this._firstPosX;
          this._posy = this._firstPosY;
          this._entringphase = false;
        }
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
  setEntrance() {
    console.log("entrance");

    if (this._enterfromright) {
      this._posX = this._firstPosX + this._xenter;
      this._posy = this._firstPosY + this._yenter;
    } else {
      this._posX = this._firstPosX - this._xenter;
      this._posy = this._firstPosY + this._yenter;
    }
    console.log("entrance", this._posX, this._posy);
  }
}

export { Enemy, Chicken };
