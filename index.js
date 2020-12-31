/* eslint-disable no-unused-vars */
import {useCallback, useRef, useState} from "react";
import {useLocalStorage} from "./useLocalStorage";
import {myError} from "./utils";

let _stateGlobal = [{}, {}];
const [stateGlobal, setStateGlobal] = _stateGlobal;
export const log = console.log;

export const getWhat = (storeName) => {
  return [stateGlobal[storeName], setStateGlobal[storeName]];
};

export const useWhat = (storeName, val) => {
  const [state, setState] = useState({[storeName]: val});

  // const having_val = val !== undefined;
  const having_val = true; // ? Testing here.
  const notHaving_val_and_is_new_key = !having_val && !setStateGlobal[storeName];

  if (having_val) {
    //This is the only required case though for the useWhat api to work,
    //for accessing old keys one must use getWhat api.
    stateGlobal[storeName] = state[storeName];

    // This callback style usage allows us to specify setState as dependency array witout creating the infinte render loop(thanks for testing too useInfiniteRender(limit) tool for helping.)
    setStateGlobal[storeName] = useCallback(
      (input) => {
        if (typeof input === "function") {
          let callback = input;
          return setState((state) => ({
            ...state,
            [storeName]: callback(state[storeName]),
          }));
        } else {
          return setState({[storeName]: input});
        }
      },
      [storeName]
    );

    // setStateGlobal[storeName] = myref.current;

    // ? Backup below!
    // setStateGlobal[storeName] = (input) => {
    //   if (typeof input === "function") {
    //     let callback = input;
    //     return setState((state) => ({
    //       ...state,
    //       [storeName]: callback(state[storeName]),
    //     }));
    //   } else {
    //     return setState({[storeName]: input});
    //   }
    // };
    // -- Backpu till here.
  }

  if (notHaving_val_and_is_new_key) {
    myError(storeName);
  }

  // Below return case executes when `not_having_val` && `is_old_key`.// We don't care to use this case though, cause for accessig old keys, we must use getWhat api. Yikes!!
  // return [stateGlobal[storeName], setStateGlobal[storeName]]; // ? Backup
  return [stateGlobal[storeName], setStateGlobal[storeName]]; // ? Testing
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
