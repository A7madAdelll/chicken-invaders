function moveAllEggs(eggs, setEggState) {
  let newEggState = [];

  for (let i = 0; i < eggs.length; i++) {
    const [x, y] = eggs[i].move();
    if (x == undefined || y == undefined) {
      eggs.splice(i, 1);
      continue;
    }
    newEggState.push({ x: eggs[i]._posX, y: eggs[i]._posy });
  }

  setEggState(newEggState);
}
function makeAChickenLayEgg(currentLevel, chickens, eggs) {
  if (currentLevel._eggDensity < Date.now() - currentLevel._lastEggTime) {
    currentLevel._lastEggTime = Date.now();
    const randomChickenIndex = Math.floor(Math.random() * chickens.length);
    const newEgg = chickens[randomChickenIndex].layEgg();
    eggs.push(newEgg);
  }
}
export { moveAllEggs, makeAChickenLayEgg };
