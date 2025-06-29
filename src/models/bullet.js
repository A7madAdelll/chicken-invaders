class Bullet {
  _posX;
  _posy;
  _width;
  _height;
  _damage;
  _speed;
  constructor(_posX, _posy, _width, _height, _damage, _speed, _coolDown) {
    this._posX = _posX;
    this._posy = _posy;
    this._width = _width;
    this._height = _height;
    this._damage = _damage;
    this._speed = _speed;
    this._coolDown = _coolDown;
  }

  move() {}
  hit(enemy) {
    enemy.sethealth -= this._damage;
  }
}
class RedBullet extends Bullet {
  _slope;

  constructor(_posX, _posy, slope) {
    super(_posX, _posy, 10, 20, 1, 3, 50);
    this._slope = slope * (Math.PI / 180);
  }

  move() {
    //sin(90)=1 cos(90)=0
    this._posy -= this._speed * Math.sin(this._slope);
    this._posX += this._speed * Math.cos(this._slope);
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

export { Bullet, RedBullet };
