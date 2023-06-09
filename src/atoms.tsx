import {atom} from "recoil";

export const timerState = atom({
  key: "timerState",
  default: {
    start: false,
    minute: 0,
    second: 10,
    round: 0,
    goal: 0,
  },
});