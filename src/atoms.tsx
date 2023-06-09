import {atom} from "recoil";

export const timerState = atom({
  key: "timerState",
  default: {
    start: false,
    minute: 1,
    second: 0,
    round: 0,
    goal: 0,
  },
});