class Enemy {
  _entringphase;
  _posX = 500;
  _posy = 0;
  _width;
  _height;
  _killable;
  _health;
  _speed;

  _EntranceMovement = () => {};
  constructor(_posX, _posy, _width, _height, _killable, _health, speed) {
    this._posX = _posX;
    this._posy = _posy;
    this._width = _width;
    this._height = _height;
    this._killable = _killable;
    this._health = _health;
    this._entringphase = true;
    this._speed = speed;
  }

  move() {}
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
    super(_posX, _posy, 100, 100, true, 10, 0.2);
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

  move = () => {
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
  setEntranceMovement(_EntranceMovement) {
    this._EntranceMovement = _EntranceMovement;
  }
}

export { Enemy, Chicken };
