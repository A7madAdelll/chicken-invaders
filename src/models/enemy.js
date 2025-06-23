class Enemy {
  _posX = 500;
  _posy = 0;
  _width;
  _height;
  _killable;
  _health;
  _moveScriptInterval;
  constructor(_posX, _posy, _width, _height, _killable, _health) {
    this._posX = _posX;
    this._posy = _posy;
    this._width = _width;
    this._height = _height;
    this._killable = _killable;
    this._health = _health;
  }
  // moveScript() {
  //   this._moveScriptInterval = setInterval(() => {
  //     this.move();
  //   }, 1000);
  // }
  move() {}
  die() {
    console.log("chicken died");
    // clearInterval(this._moveScriptInterval);
  }
}

class Chicken extends Enemy {
  constructor(_posX, _posy) {
    super(_posX, _posy, 100, 100, true, 10);
  }
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
}

export { Enemy, Chicken };
