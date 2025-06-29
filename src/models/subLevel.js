import { Chicken } from "./enemy";
import {
  ChickenEntranceXp2__Y,
  ChickenEntrancehorizontal,
} from "./ChieckenEntrance";
class Sublevel {
  _lastEggTime = Date.now() - 100000;
  _eggDensity;
  chickens = [];

  startLevel() {}
  isDone() {
    if (this.chickens.length == 0) return true;
    else {
      return false;
    }
  }
}
class Level1 extends Sublevel {
  startLevel() {
    const chickensArray = [];
    for (let i = 0; i < 5; i++) {
      const x = 400 + i * 120; // spacing between chickens
      const y = 100; // same Y for a horizontal row
      const entrance = new ChickenEntranceXp2__Y(0.1, x, y);

      const chicken = new Chicken(x, y, entrance);

      this.chickens.push(chicken);
      chickensArray.push({ x: chicken._posX, y: chicken._posy });
    }
  }

  constructor() {
    super();
    this._eggDensity = 3000;
    // this.startLevel();
  }
  getLevel() {
    // console.log("chickens", this.chickens);
    return this.chickens;
  }
}
class Level2 extends Sublevel {
  startLevel() {
    const chickensArray = [];
    for (let i = 0; i < 10; i++) {
      const x = 100 + i * 120;
      const y = 100;
      const entrance = new ChickenEntrancehorizontal(5, x, y);
      const chicken = new Chicken(x, y, entrance);
      this.chickens.push(chicken);
      chickensArray.push({ x: chicken._posX, y: chicken._posy });
    }
    for (let i = 0; i < 10; i++) {
      const x = 100 + i * 120;
      const y = 200;
      const entrance = new ChickenEntrancehorizontal(3, x, y);
      const chicken = new Chicken(x, y, entrance);
      this.chickens.push(chicken);
      chickensArray.push({ x: chicken._posX, y: chicken._posy });
    }
  }

  constructor() {
    super();

    this._eggDensity = 3000;
  }
  getLevel() {
    // console.log("chickens", this.chickens);

    return this.chickens;
  }
}

class Level3 extends Sublevel {
  startLevel() {
    const chickensArray = [];
    for (let i = 0; i < 10; i++) {
      const x = 100 + i * 120;
      const y = 100;
      const entrance = new ChickenEntrancehorizontal(5, x, y);
      const chicken = new Chicken(x, y, entrance);
      this.chickens.push(chicken);
      chickensArray.push({ x: chicken._posX, y: chicken._posy });
    }
    for (let i = 0; i < 10; i++) {
      const x = 100 + i * 120;
      const y = 200;
      const entrance = new ChickenEntrancehorizontal(3, x, y);
      const chicken = new Chicken(x, y, entrance);
      this.chickens.push(chicken);
      chickensArray.push({ x: chicken._posX, y: chicken._posy });
    }
    for (let i = 0; i < 10; i++) {
      const x = 100 + i * 120;
      const y = 300;
      const entrance = new ChickenEntrancehorizontal(3, x, y);
      const chicken = new Chicken(x, y, entrance);
      this.chickens.push(chicken);
      chickensArray.push({ x: chicken._posX, y: chicken._posy });
    }
  }

  constructor() {
    super();

    this._eggDensity = 1000;
  }
  getLevel() {
    // console.log("chickens", this.chickens);

    return this.chickens;
  }
}
export { Level1, Level2, Level3 };
