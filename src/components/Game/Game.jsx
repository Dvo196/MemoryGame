import { Box, Button, Flex, Image, Text, keyframes, transition } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import shrek from "../../assets/images/shrek.jfif";
import esh from "../../assets/images/esh.jfif";
import fiona from "../../assets/images/Fiona.png";
import fandom from "../../assets/images/fandom.webp";
import feya from "../../assets/images/feya.png";
import godfather from "../../assets/images/godfather.png";
import alpachino from "../../assets/images/alpachino.png";
import hz from "../../assets/images/hz.png";
import fredo from "../../assets/images/fredo.png";
import sonny from "../../assets/images/sonny.png";
import { shuffleArray } from "../../helpers/shuffleArray";
import { Timer } from "../../helpers/timer";

const images = [
  fiona,
  shrek,
  esh,
  fandom,
  feya,
  godfather,
  alpachino,
  hz,
  fredo,
  sonny,
];

export default function Game() {
  const [startGame, setStartGame] = useState(false);
  const [firstOpened, setFirstOpened] = useState(null);
  const [secondOpened, setSecondOpened] = useState(null);
  const [thirdOpened, setThirdOpened] = useState(null);
  const [gameImages, setGameImages] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [allCardsMatched, setAllCardsMatched] = useState(false);
  const gameContainerRef = useRef(null);
  const [displayText, setDisplayText] = useState(false);
  const [winCount, setWinCount] = useState(() => {
    const storedWinCount = localStorage.getItem("winCount");
    return storedWinCount ? parseInt(storedWinCount, 10) : 0;
  });

  const initializeGame = () => {
    const shuffledImages = shuffleArray(images.concat(images));
    setGameImages(shuffledImages);
    setFirstOpened(null);
    setSecondOpened(null);
    setThirdOpened(null);
    setMatchedIndices([]);
    setMatchedCount(0);
    setAllCardsMatched(false);
    setDisplayText(false);
  };

  const fadeInAnimation = keyframes`
    0% {
      opacity: 0;
      transform: translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  
  const imagesAnimationOpen = keyframes`
  50% {
transform:matrix(-1.00,0.00,0.00,1.00,0,0);
-ms-transform:matrix(-1.00,0.00,0.00,1.00,0,0);
-webkit-transform:matrix(-1.00,0.00,0.00,1.00,0,0);

` 
    // transform: rotate(90deg);
  useEffect(() => {
    localStorage.setItem("winCount", winCount.toString());
  }, [winCount]);

  useEffect(() => {
    let timer;
    if (startGame) {
      timer = setTimeout(() => {
        if (!allCardsMatched) {
          setDisplayText("Play Again!");
          setStartGame(false);
        }
      }, 300000);
    }
    return () => clearTimeout(timer);
  }, [startGame, allCardsMatched]);

  useEffect(() => {
    if (matchedCount === images.length * 2) {
      setAllCardsMatched(true);
      setStartGame(false);
    }
  }, [matchedCount]);

  const handleStartGame = () => {
    initializeGame();
    setStartGame(true);
     <Box
     transition="5s"
     >
   </Box>
  };


  const handlePlayAgain = () => {
    initializeGame();
    setStartGame(true);
  };

  const handleCardClick = (index) => {
    if (matchedIndices.includes(index)) return;

    if (firstOpened === null) {
      setFirstOpened(index);
    } else if (secondOpened === null && index !== firstOpened) {
      setSecondOpened(index);
      checkMatch(index);
    } else if (
      thirdOpened === null &&
      index !== firstOpened &&
      index !== secondOpened
    ) {
      setThirdOpened(index);
      checkMatch(index, true);
    }
  };

  const checkMatch = (index, isThirdCard = false) => {
    if (!isThirdCard) {
      if (gameImages[firstOpened] === gameImages[index]) {
        setMatchedIndices((prev) => [...prev, firstOpened, index]);
        setMatchedCount((prev) => prev + 2);
        setFirstOpened(null);
        setSecondOpened(null);
      } else {
        setTimeout(() => {
          setFirstOpened(null);
          setSecondOpened(null);
        }, 1000);
      }
    } else {
      if (
        gameImages[firstOpened] === gameImages[index] ||
        gameImages[secondOpened] === gameImages[index]
      ) {
        setMatchedIndices((prev) => [...prev, index]);
        setMatchedCount((prev) => prev + 1);
        setFirstOpened(null);
        setSecondOpened(null);
        setThirdOpened(null);
      } else {
        setTimeout(() => {
          setFirstOpened(null);
          setSecondOpened(null);
          setThirdOpened(null);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (allCardsMatched) {
      setWinCount((prevWinCount) => prevWinCount + 1);
      setStartGame(false); // Остановка игры
    }
  }, [allCardsMatched]);

  const isOpen = (index) => {
    return (
      index === firstOpened ||
      index === secondOpened ||
      index === thirdOpened ||
      matchedIndices.includes(index)
    );
  };

  const fireworkAnimation = keyframes`
    0% { transform: translate(var(--x), var(--initialY)); width: var(--initialSize); opacity: 1; }
    50% { width: 0.5vmin; opacity: 1; }
    100% { width: var(--finalSize); opacity: 0; }
  `;

  const Firework = ({ colors, finalSize, x, y, delay }) => (
    <Box
      className="firework"
      position="absolute"
      top="25%"
      left="50%"
      transform="translate(-100%, var(--y))"
      width="var(--initialSize)"
      aspectRatio={1}
      background={`radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 50% 0%, 
                   radial-gradient(circle, ${colors[1]} 0.2vmin, #0000 0) 100% 50%, 
                   radial-gradient(circle, ${colors[2]} 0.2vmin, #0000 0) 50% 100%, 
                   radial-gradient(circle, ${colors[3]} 0.2vmin, #0000 0) 0% 50%, 
                   radial-gradient(circle, ${colors[4]} 0.2vmin, #0000 0) 80% 90%, 
                   radial-gradient(circle, ${colors[5]} 0.2vmin, #0000 0) 95% 90%, 
                   radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 90% 70%, 
                   radial-gradient(circle, ${colors[1]} 0.2vmin, #0000 0) 100% 60%, 
                   radial-gradient(circle, ${colors[2]} 0.2vmin, #0000 0) 55% 80%, 
                   radial-gradient(circle, ${colors[3]} 0.2vmin, #0000 0) 70% 77%, 
                   radial-gradient(circle, ${colors[4]} 0.2vmin, #0000 0) 22% 90%, 
                   radial-gradient(circle, ${colors[5]} 0.2vmin, #0000 0) 45% 90%, 
                   radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 33% 70%, 
                   radial-gradient(circle, ${colors[1]} 0.2vmin, #0000 0) 10% 60%, 
                   radial-gradient(circle, ${colors[2]} 0.2vmin, #0000 0) 31% 80%, 
                   radial-gradient(circle, ${colors[3]} 0.2vmin, #0000 0) 28% 77%, 
                   radial-gradient(circle, ${colors[4]} 0.2vmin, #0000 0) 13% 72%, 
                   radial-gradient(circle, ${colors[5]} 0.2vmin, #0000 0) 80% 10%, 
                   radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 95% 14%, 
                   radial-gradient(circle, ${colors[1]} 0.2vmin, #0000 0) 90% 23%, 
                   radial-gradient(circle, ${colors[2]} 0.2vmin, #0000 0) 100% 43%, 
                   radial-gradient(circle, ${colors[3]} 0.2vmin, #0000 0) 85% 27%, 
                   radial-gradient(circle, ${colors[4]} 0.2vmin, #0000 0) 77% 37%, 
                   radial-gradient(circle, ${colors[5]} 0.2vmin, #0000 0) 60% 7%, 
                   radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 22% 14%, 
                   radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 45% 20%, 
                   radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 33% 34%, 
                   radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 10% 29%, 
                   radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 31% 37%, 
                   radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 28% 7%, 
                   radial-gradient(circle, ${colors[0]} 0.2vmin, #0000 0) 13% 42%`}
      backgroundSize="var(--initialSize) var(--initialSize)"
      backgroundRepeat="no-repeat"
      animation={`${fireworkAnimation} 2s infinite`}
      style={{
        "--initialSize": "0.5vmin",
        "--finalSize": finalSize,
        "--particleSize": "0.2vmin",
        "--color1": colors[0],
        "--color2": colors[1],
        "--color3": colors[2],
        "--color4": colors[3],
        "--color5": colors[4],
        "--color6": colors[5],
        "--x": x,
        "--y": y,
        "--initialY": "60vmin",
        animationDelay: delay,
        marginTop: "250px",
      }}
    />
  );

  const Fireworks = () => (
    <>
      <Box
        height="100vh"
        overflow="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Firework
          colors={[
            "yellow",
            "khaki",
            "white",
            "lime",
            "gold",
            "mediumseagreen",
          ]}
          finalSize="45vmin"
          x="-50%"
          y="-30vmin"
        />
        <Firework
          colors={["pink", "violet", "fuchsia", "orchid", "plum", "lavender"]}
          finalSize="40vmin"
          x="30vmin"
          y="-30vmin"
          delay="-0.25s"
        />
        <Firework
          colors={[
            "cyan",
            "lightcyan",
            "lightblue",
            "PaleTurquoise",
            "SkyBlue",
            "lavender",
          ]}
          finalSize="35vmin"
          x="-30vmin"
          y="-50vmin"
          delay="-0.4s"
        />
      </Box>
    </>
  );

  return (
    <Box mt="90" ml="400" bg="green" width="700px" height="620px">
      <Box>
        <Text
          fontSize="50px"
          fontWeight="1000"
          fontFamily="Libre Baskerville"
          pt="6"
          textAlign="center"
          color="white"
          display="flex"
          ml="30px"
        >
          <Text color="white" textAlign="center" fontSize="20px" pt="22px">
            Win {winCount} time
          </Text>
          <Text ml="64px">Memory Game!</Text>
        </Text>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          transform="translateY(150px)"
        >
          <Button
            onClick={handleStartGame}
            color="white"
            bg="darkorchid"
            width="300px"
            height="77px"
            fontSize="50px"
            size="100px"
            className="StartGame"
            // handleStartGameAnimation  handleStartGame
            style={{
              display:
                !startGame && !displayText && !allCardsMatched
                  ? "block"
                  : "none",
                  transition: "opacity 1s ease-in-out",
            }}
          >
            Start Game
          </Button>

          <Box>
            <Text
              fontSize="50px"
              fontWeight="1000"
              fontFamily="Libre Baskerville"
              textAlign="center"
              color="white"
              style={{
                display: !startGame && displayText ? "block" : "none",
              }}
            >
              Time is over
            </Text>
            <Button
              onClick={handleStartGame}
              color="white"
              bg="darkorchid"
              height="77px"
              fontSize="50px"
              mt="2"
              size="100px"
              className="StartGame"
              style={{
                display:
                  !startGame && displayText && !allCardsMatched
                    ? "block"
                    : "none",
                width: displayText ? "300px" : "0px",
              }}
            >
              {displayText}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className="winner">
        {allCardsMatched && (
          <>
            <Text color="white" textAlign="center" fontSize="80px" pt="80px">
              Winner
            </Text>
            <Button
              onClick={handlePlayAgain}
              color="white"
              bg="darkorchid"
              width="300px"
              height="77px"
              fontSize="50px"
              className="tryagain"
              ml="200"
              mt="5"
            >
              Play Again
            </Button>
            <Fireworks />
          </>
        )}
      </Box>
      <Box
        className="timer-container"
        style={{ display: allCardsMatched ? "none" : "block" }}
      >
        <Timer startGame={startGame} setStartGame={setStartGame} />
      </Box>
      <Flex
        ref={gameContainerRef}
        justifyContent="space-between"
        wrap="wrap"
        p="6"
        id="full"
        style={{ 
          display: startGame && !allCardsMatched ? "flex" : "none" ,
          opacity: startGame ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
        in={isOpen}
      >
        {gameImages.map((img, index) => {
          return (
            <Box
              className="beril"
              key={index}
              mt={5}
              onClick={() => handleCardClick(index)}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="white"
              width="120px"
              height="100px"
              animation={`${fadeInAnimation} 0.5s ease-in-out`}
              >
              <Image
                style={{
                  display: isOpen(index) ? "block" : "none",
                  opacity: startGame ? 1 : 0,
                  transition: "opacity 5s ease-in-out",
                  
                }}
                
                animation={`${imagesAnimationOpen} 0.5s ease-in-out`}
                id="shrek"
                width="110px"
                height="90px"
                src={img}
              />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}
