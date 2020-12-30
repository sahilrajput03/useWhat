/* eslint-disable no-unused-vars */
import {useState} from "react";
import {useLocalStorage} from "./useLocalStorage";
import {myError} from "./utils";

let _stateGlobal = [{}, {}];
const [stateGlobal, setStateGlobal] = _stateGlobal;
let log = console.log;

export const getWhat = (storeName) => {
  // const [stateGlobal, setStateGlobal] = _stateGlobal;
  return [stateGlobal[storeName], setStateGlobal[storeName]];
};

export const useWhat = (storeName, val) => {
  const [state, setState] = useState({[storeName]: val});

  // const having_val = val !== undefined;
  const having_val = true; // ? Testing here.
  const notHaving_val_and_is_new_key = !having_val && !setStateGlobal[storeName];

  if (having_val) {
    stateGlobal[storeName] = state[storeName];

    setStateGlobal[storeName] = (input) => {
      if (typeof input === "function") {
        let callback = input;
        return setState((state) => ({
          ...state,
          [storeName]: callback(state[storeName]),
        }));
      }

      return setState({[storeName]: input});
    };
  }

  if (notHaving_val_and_is_new_key) {
    myError(storeName);
  }

  return [stateGlobal[storeName], setStateGlobal[storeName]];
};

export const useWhatPersistent = (storeName, val) => {
  const [state, setState] = useLocalStorage(storeName, {[storeName]: val});

  const having_val = val !== undefined;
  const notHaving_val_and_is_new_key = !having_val && !setStateGlobal[storeName];

  if (having_val) {
    stateGlobal[storeName] = state[storeName];

    setStateGlobal[storeName] = (input) => {
      if (typeof input === "function") {
        let callback = input;
        return setState((state) => ({
          ...state,
          [storeName]: callback(state[storeName]),
        }));
      }

      return setState({[storeName]: input});
    };
  }

  if (notHaving_val_and_is_new_key) {
    myError(storeName);
  }

  return [stateGlobal[storeName], setStateGlobal[storeName]];
};
