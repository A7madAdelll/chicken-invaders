import { secDegEq } from "../helper functions/secDegEq";
class ChickenEntrance {
  _firstPosX = 0;
  _firstPosY = 0;
  _xenter = 0;
  _yenter = 0;
  _enterfromright = true;
  _speed = 0;
  _posX = 0;
  _posy = 0;
  _entringphase = true;
  constructor() {}
  move() {}
}
class ChickenEntranceXp2__Y extends ChickenEntrance {
  constructor(speed, _firstPosX, _firstPosY) {
    super();

    this._firstPosX = _firstPosX;
    this._firstPosY = _firstPosY;
    this._speed = speed;
    this._enterfromright = Math.random() > 0.5;
    if (this._enterfromright) {
      this._xenter = 50;
    } else {
      this._xenter = -50;
    }
    this._yenter = secDegEq(this._xenter);
    this._posX = this._firstPosX + this._xenter;
    this._posy = this._firstPosY + this._yenter;
  }

  move() {
    if (this._enterfromright) {
      this._xenter -= this._speed;
      this._yenter = secDegEq(this._xenter);

      this._posX = this._firstPosX + this._xenter;
      this._posy = this._firstPosY + this._yenter;

      if (this._posX - this._firstPosX <= 0) {
        this._posX = this._firstPosX;
        this._posy = this._firstPosY;
        this._entringphase = false;
      }
    } else {
      this._xenter += this._speed;
      this._yenter = secDegEq(this._xenter);

      this._posX = this._firstPosX + this._xenter;
      this._posy = this._firstPosY + this._yenter;

      if (this._posX - this._firstPosX >= 0) {
        this._posX = this._firstPosX;
        this._posy = this._firstPosY;
        this._entringphase = false;
      }
    }
    return [this._posX, this._posy, this._entringphase];
  }
  setEntrance() {
    return [this._posX, this._posy];
  }
}
class ChickenEntrancehorizontal extends ChickenEntrance {
  constructor(speed, _firstPosX, _firstPosY) {
    super();

    this._firstPosX = _firstPosX;
    this._firstPosY = _firstPosY;
    this._speed = speed;
    this._enterfromright = Math.random() > 0.5;
    if (this._enterfromright) {
      this._xenter = 1700;
    } else {
      this._xenter = -1700;
    }
    this._yenter = 0;
    this._posX = this._firstPosX + this._xenter;
    this._posy = this._firstPosY + this._yenter;
  }

  move() {
    if (this._enterfromright) {
      this._xenter -= this._speed;
      this._yenter = 0;

      this._posX = this._firstPosX + this._xenter;
      this._posy = this._firstPosY + this._yenter;

      if (this._posX - this._firstPosX <= 0) {
        this._posX = this._firstPosX;
        this._posy = this._firstPosY;
        this._entringphase = false;
      }
    } else {
      this._xenter += this._speed;
      this._yenter = 0;

      this._posX = this._firstPosX + this._xenter;
      this._posy = this._firstPosY + this._yenter;

      if (this._posX - this._firstPosX >= 0) {
        this._posX = this._firstPosX;
        this._posy = this._firstPosY;
        this._entringphase = false;
      }
    }
    return [this._posX, this._posy, this._entringphase];
  }
  setEntrance() {
    return [this._posX, this._posy];
  }
}
export { ChickenEntranceXp2__Y, ChickenEntrancehorizontal };
