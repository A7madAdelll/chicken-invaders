import { areRectanglesColliding } from "../helper functions/checkRectanglesCollide";
export default function moveAllMovables(
  bullets,
  setBulletState,
  chickens,
  setChickensState
) {
  moveAllBullets(bullets, setBulletState, chickens, setChickensState);
}
function moveAllBullets(bullets, setBulletState, chickens, setChickensState) {
  let newbulletState = [];
  let i = 0;

  while (i < bullets.length) {
    const [x, y] = bullets[i].move();

    if (x == undefined || y == undefined) {
      bullets.splice(i, 1);
      continue;
    }

    const { didBulletHitChicken, j } = checkifBulletHitChicken(
      x,
      y,
      chickens,
      bullets,
      i,
      setChickensState,
      newbulletState
    );
    if (didBulletHitChicken) {
      console.log("bullet hit chicken");

      const isitdead = chickens[j].gothit(bullets[i]._damage);
      if (isitdead) {
        chickens.splice(j, 1);
        setChickensState((currentState) => {
          return currentState.filter((chicken, index) => index != j);
        });
      }
      bullets.splice(i, 1);
      break;
    } else {
      newbulletState.push({
        x: bullets[i]._posX,
        y: bullets[i]._posy,
      });
    }

    if (chickens.length == 0 && bullets.length != 0) {
      newbulletState.push({
        x: bullets[i]._posX,
        y: bullets[i]._posy,
      });
    }
    i++;
  }

  setBulletState([...newbulletState]);
}
function checkifBulletHitChicken(
  x,
  y,
  chickens,
  bullets,
  i,
  setChickensState,
  newbulletState
) {
  for (let j = 0; j < chickens.length; j++) {
    let rect1 = [
      chickens[j]._posX,
      chickens[j]._posy,
      chickens[j]._posX + chickens[j]._width,
      chickens[j]._posy + chickens[j]._height,
    ];
    let rect2 = [x, y, x + bullets[i]._width, y + bullets[i]._height];
    console.log(rect1, rect2, j);

    if (areRectanglesColliding(rect1, rect2)) {
      console.log(j);

      return { didBulletHitChicken: true, j: j };
    }
  }

  return { didBulletHitChicken: false, j: null };
}
function checkIfChickenDead() {}
