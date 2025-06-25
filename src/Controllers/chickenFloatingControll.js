const moveAllChickens = (chickens, setChickensState) => {
  let newChickenState = [];
  for (let i = 0; i < chickens.length; i++) {
    chickens[i].move();
    newChickenState.push({ x: chickens[i]._posX, y: chickens[i]._posy });
  }
  setChickensState(newChickenState);
};
export default moveAllChickens;
