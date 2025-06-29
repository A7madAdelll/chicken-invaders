"use client";
import styles from "./gameplay.module.css";
import { useEffect, useRef, useState } from "react";
import { Player } from "@/models/player";
// import { Enemy } from "@/models/enemy";
import { RedBullet } from "@/models/bullet";
import { EnginController } from "@/Controllers/enginControler";
import Image from "next/image";
const Engine = () => {
  // const playerRef = useRef({});
  const [gamerunning, setGamerunning] = useState(true);
  const engineRef = useRef({});
  const keysPressed = useRef({});
  const [playerState, setPlayerState] = useState({});
  const [chickensState, setChickensState] = useState([]);
  const [eggsState, setEggsState] = useState([]);
  const [eggState, setEggState] = useState([]);
  const [bulletState, setBulletState] = useState([]);

  // Initialize Player
  useEffect(() => {
    const engine = new EnginController(1550, 730, {
      setPlayerState: setPlayerState,
      setEggState: setEggState,
      setBulletState: setBulletState,
      setChickensState: setChickensState,
      setEggsState: setEggsState,
    });
    // playerRef.current = new Player(5, "red"); // x=100, y=100 as example
    engineRef.current = engine;
    engine.startGame();

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

  // useEffect(() => {
  // }, [bulletState]);
  // Game Loop with requestAnimationFrame
  useEffect(() => {
    let frameId;

    const update = () => {
      if (gamerunning == false) return;
      if (!engineRef.current) return;

      const gamewon = engineRef.current.calculateOneFrame(keysPressed);
      if (gamewon == false) return;
      frameId = requestAnimationFrame(update);
    };
    if (gamerunning != false) {
      frameId = requestAnimationFrame(update);
    }
    console.log("game stopped");

    return () => cancelAnimationFrame(frameId);
  }, [gamerunning]);

  return (
    <div className={styles.container}>
      {/* Player */}

      {playerState.x != undefined ? (
        <div
          className={styles.player}
          style={{
            top: playerState.y,
            left: playerState.x,
          }}
        >
          <Image
            height={100}
            width={100}
            alt="spaceship"
            src="/spaveship.png"
            className={styles.spaceshipImage}
          />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 600,
            textAlign: "center",
            color: "red",
            fontSize: "50px",
          }}
        >
          you are dead
        </div>
      )}

      {/* Bullets */}
      {bulletState?.map((bullet, index) => (
        <div
          key={index}
          className={styles.bullet}
          style={{
            top: bullet.y,
            left: bullet.x,
          }}
        >
          {/* <Image src="/bullet.png" alt="egg" height={40} width={40}></Image> */}
        </div>
      ))}
      {/* eggs */}
      {eggState?.map((egg, index) => (
        <div
          key={index}
          style={{
            top: egg.y,
            left: egg.x,
            position: "absolute",
            width: 20,
            height: 20,
          }}
        >
          <Image src="/egg.png" alt="egg" height={30} width={20}></Image>
        </div>
      ))}
      {/* Chickens */}
      {chickensState?.map((chicken, index) => (
        <div
          key={index}
          className={styles.chicken}
          style={{
            top: chicken.y,
            left: chicken.x,
          }}
        >
          <Image
            src="/chicken.png"
            alt="chicken"
            height={100}
            width={100}
          ></Image>
        </div>
      ))}
    </div>
  );
};

export default Engine;
