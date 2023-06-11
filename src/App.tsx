import {useState,useEffect} from "react";
import {useRecoilState} from "recoil";
import {timerState} from "./atoms";
import styled from "styled-components";
import { motion} from "framer-motion";
import Confetti from "react-confetti";

const Wrapper=styled.div`
  width: 100%;
  height: 100%;
`;


const Pomodoro=styled.h1`
  color:white;
  font-size:60px;
  font-weight:600;
  display:flex;
  justify-content:center;
`;

const Timer=styled(motion.div)`
  margin-top:70px;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const MinuteBox=styled(motion.div)`
  width:180px;
  height:250px;
  background-color:white;
  color:tomato;
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:90px;
  font-weight:600;
  margin-right: 20px;
`;

const SecondBox=styled(motion.div)`
  width:180px;
  height:250px;
  background-color:white;
  color:tomato;
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:90px;
  font-weight:600;
  margin-left:20px;
`;



const TimerStateBtn=styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  margin:0 auto;
  outline:none;
  cursor: pointer;
  
  svg {
    width: 60px; 
    height: 60px;
  }
`;


const CheckBox=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position:absolute;
  top:80%;
  left:50%;
  transform: translate(-50%, -50%);
`;

const RoundCheckBox=styled.div`
  color:white;
  font-size:20px;
  font-weight:600;
  display:flex;
  flex-direction: column;
  span:first-child{
    opacity:0.5;
    margin-bottom:10px;
  }
  margin-right:40px;
  text-align:center;
`;

const GoalCheckBox=styled.div`
  color:white;
  font-size:20px;
  font-weight:600;
  display:flex;
  flex-direction: column;
  span:first-child{
    opacity:0.5;
    margin-bottom:10px;
  }
  margin-left:40px;
  text-align:center;
`;


function App(){
  const [timer, setTimer] = useRecoilState(timerState);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let countdownConfetti: number | undefined;

    if (timer.goal) {
      setShowConfetti(true);

      countdownConfetti = window.setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    }

    return () => clearTimeout(countdownConfetti);
  }, [timer.goal]);


  useEffect(() => {
    let countdownInterval: number | undefined;

    if (timer.start) {
      countdownInterval = window.setInterval(() => {
        if (timer.minute === 0 && timer.second === 0) {
          setTimer((prevTimer) => ({
            ...prevTimer,
            minute: 0,
            second: 3,
            round: prevTimer.round + 1,
            start:false
          }));

          if (timer.round + 1 === 4) {
            setTimer((prevTimer) => ({
              ...prevTimer,
              goal: prevTimer.goal + 1 ,
              round: 0,
            }));
          }
        } else {
          if (timer.second === 0) {
            setTimer((prevTimer) => ({
              ...prevTimer,
              minute: prevTimer.minute - 1,
              second: 59,
            }));
          } else {
            setTimer((prevTimer) => ({
              ...prevTimer,
              second: prevTimer.second - 1,
            }));
          }
        }
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [timer.start, timer.minute, timer.second, timer.round, setTimer]);
  
  
  const handleTimerToggle = () => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      start: !prevTimer.start,
    }));
  };

  return (
    <Wrapper>
      <Pomodoro>Pomodoro</Pomodoro>
      <Timer>
        <MinuteBox
          key={timer.minute}
          initial={{ scale:0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
              duration: 0.2,
          }}
        >
          {timer.minute < 10 ? "0" + timer.minute : timer.minute}</MinuteBox>
        <span style={{ fontSize: 80, color: "white" }}>:</span>
        <SecondBox
          key={timer.second}
          initial={{ scale:0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
              duration: 0.2,
          }}
        >
          {timer.second < 10 ? "0" + timer.second : timer.second}</SecondBox>
      </Timer>
      <TimerStateBtn 
        whileHover={{
          scale:1.5,
          transition:{duration:0.2},
        }}
        
        onClick={handleTimerToggle}>
      {timer.start ? (
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"></path>
        </svg>
        ) : (
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
        </svg>
        )}
      </TimerStateBtn>
      
      <CheckBox>
        <RoundCheckBox>
          <span>{timer.round}/4</span>
          <span>ROUND</span>
        </RoundCheckBox>
        <GoalCheckBox>
          <span>{timer.goal}/12</span>
          <span>GOAL</span>
        </GoalCheckBox>
      </CheckBox>
      {showConfetti && <Confetti />}
    </Wrapper>
  );
}

export default App;