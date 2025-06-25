import { Enemy, Chicken } from "./enemy";
class Sublevel {
  chickens = [];
  done = false;

  startLevel() {}
}
class Level1 extends Sublevel {
  startLevel() {
    const chickensArray = [];
    for (let i = 0; i < 10; i++) {
      const x = 100 + i * 120; // spacing between chickens
      const y = 100; // same Y for a horizontal row
      const chicken = new Chicken(x, y);
      console.log("chicken", chicken);
      chicken.setEntrance();

      this.chickens.push(chicken);
      chickensArray.push({ x: chicken._posX, y: chicken._posy });
    }
    console.log("chickens from inside", this.chickens);
  }

  constructor() {
    super();
    this.startLevel();
  }
  getLevel() {
    return this.chickens;
  }
}

export { Level1 };
