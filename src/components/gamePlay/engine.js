"use client";
import { useEffect, useRef, useState } from "react";
import { Player } from "@/models/player";
// import { Enemy } from "@/models/enemy";
import { RedBullet } from "@/models/bullet";
import { EnginController } from "@/models/enginControler";
import Image from "next/image";
const Engine = () => {
  // const playerRef = useRef({});
  const [gamerunning, setGamerunning] = useState(true);
  const engineRef = useRef({});
  const keysPressed = useRef({});
  const [playerState, setPlayerState] = useState({});
  const [enemyState, setEnemyState] = useState([]);
  const [eggState, setEggState] = useState([]);
  const [bulletState, setBulletState] = useState([]);

  // Initialize Player
  useEffect(() => {
    const engine = new EnginController(1550, 730, {
      setPlayerState: setPlayerState,
      setEnemyState: setEnemyState,
      setEggState: setEggState,
      setBulletState: setBulletState,
    });
    // playerRef.current = new Player(5, "red"); // x=100, y=100 as example
    engineRef.current = engine;
    engine.startGame();
    setPlayerState({
      x: engineRef.current.player._posX,
      y: engineRef.current.player._posy,
    });

    const handleKeyDown = (event) => {
      if (event.key === "p") {
        setGamerunning((prev) => {
          console.log("Paused:", !prev);
          return !prev;
        });
      }

      keysPressed.current[event.key] = true;
    };

    const handleKeyUp = (event) => {
      keysPressed.current[event.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Game Loop with requestAnimationFrame
  useEffect(() => {
    let frameId;

    const update = () => {
      if (gamerunning == false) return;
      if (!engineRef.current) return;
      //when key pressed engine controller will be called
      Object.keys(keysPressed.current).forEach((key) => {
        if (keysPressed.current[key]) {
          engineRef.current.pressButton(key);
        }
      });

      engineRef.current.moveAllMovables();

      frameId = requestAnimationFrame(update);
    };
    if (gamerunning != false) {
      frameId = requestAnimationFrame(update);
    }
    console.log("game stopped");

    return () => cancelAnimationFrame(frameId);
  }, [gamerunning]);

  return (
    <div
      style={{
        backgroundImage: `url("/background.jpeg")`,
        height: "730px",
        width: "1550px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Player */}
      <div
        style={{
          position: "absolute",
          top: playerState.y,
          left: playerState.x,
          width: "50px",
          height: "50px",
          // backgroundColor: "red",
          overflow: "visible",
        }}
      >
        <Image
          height={100}
          width={100}
          alt="spaveship"
          src="/spaveship.png"
          style={{ marginLeft: "-25px" }}
        ></Image>
      </div>
      {bulletState?.map((bullet, index) => {
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: bullet.y,
              left: bullet.x,
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              overflow: "visible",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Engine;
