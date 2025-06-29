import { areRectanglesColliding } from "../helper functions/checkRectanglesCollide";
function checkPlayerDeath(player, chickens, eggs) {
  const playerRect = [
    player._posX,
    player._posy,
    player._posX + player._width,
    player._posy + player._height,
  ];

  for (let i = 0; i < chickens.length; i++) {
    const chickenRect = [
      chickens[i]._posX,
      chickens[i]._posy,
      chickens[i]._posX + chickens[i]._width,
      chickens[i]._posy + chickens[i]._height,
    ];
    const colide = areRectanglesColliding(playerRect, chickenRect);
    if (colide) {
      const isDead = player.die();

      return isDead;
    }
  }
  for (let i = 0; i < eggs.length; i++) {
    const eggRect = [
      eggs[i]._posX,
      eggs[i]._posy,
      eggs[i]._posX + eggs[i]._width,
      eggs[i]._posy + eggs[i]._height,
    ];
    const colide = areRectanglesColliding(playerRect, eggRect);
    if (colide) {
      const isDead = player.die();
      return isDead;
    }
  }
}
export { checkPlayerDeath };
