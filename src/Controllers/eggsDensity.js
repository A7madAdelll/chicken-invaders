export function eggDensityControl(currentLevel, chickens) {
  if (currentLevel._eggDensity < Date.now() - currentLevel._lastEggTime) {
    currentLevel._lastEggTime = Date.now();
    const randomChickenIndex = Math.floor(Math.random() * chickens.length);
    chickens[randomChickenIndex].layEgg();
  }
}
