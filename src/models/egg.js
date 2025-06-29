class Egg {
  _posX;
  _posy;
  _width;
  _height;
  _speed;
  constructor(_posX, _posy, _width, _height, _speed) {
    this._posX = _posX;
    this._posy = _posy;
    this._width = _width;
    this._height = _height;
    this._speed = _speed;
  }

  move() {}
  hit(player) {
    player.sethealth -= this._damage;
  }
}
class SimpleEgg extends Egg {
  constructor(_posX, _posy) {
    super(_posX, _posy, 20, 30, 1);
  }

  move() {
    this._posy += this._speed;
    if (
      this.posX > 1600 ||
      this.posX < -50 ||
      this.posY > 780 ||
      this.posY < -50
    )
      return [undefined, undefined];
    else return [this._posX, this._posy];
  }
}

export { SimpleEgg };
