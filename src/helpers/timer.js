import { Box, Text } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { TimeIcon } from 'chakra-ui-ionicons';

export function Timer({ startGame, setStartGame, setAllCardsMatched , allCardsMatched }) {
  const timerRef = useRef(null);
  const [timer, setTimer] = useState("5:00");

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (endTime) => {
    const updateTimer = () => {
      let { total, minutes, seconds } = getTimeRemaining(endTime);
      if (total >= 0) {
        setTimer(
          `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
        );
      } else {
        setTimer("0:00");
        clearInterval(timerRef.current);
      }
    };

    // Запуск таймера с интервалом 1 секунда
    timerRef.current = setInterval(updateTimer, 1000);
    updateTimer(); // Запустить первое обновление таймера сразу
  };

  useEffect(() => {
    if (startGame) {
      const endTime = new Date();
      endTime.setMinutes(endTime.getMinutes() + 5 ); // Установить время окончания (5 минут)
      startTimer(endTime);
    } else {
      setTimer("5:00"); 
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [startGame, setStartGame]);


  
 
  if (!startGame) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" transform="translate(-50px, -20px)" mt="-25" >

      <Text >{timer}</Text>
        <TimeIcon ml="3px"/>
    </Box>
  );
}
