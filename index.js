/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

let _stateGlobal = [{}, {}];
let log = console.log;

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getWhat = (storeName) => {
	const [stateGlobal, setStateGlobal] = _stateGlobal;
	return [stateGlobal[storeName], setStateGlobal[storeName]];
};

export const useWhat = (storeName, val, localStorageBoolean) => {
	let _state1 = useState({ [storeName]: val });
	let _state2 = useLocalStorage(storeName, { [storeName]: val });
	let _state;
	if (localStorageBoolean) {
		_state = _state2;
	} else {
		_state = _state1;
	}
	const state = _state.state;
	const setState = _state.setState;
	// const [, setState] = _state;
	const [stateGlobal, setStateGlobal] = _stateGlobal;

	if (val !== undefined) {
		stateGlobal[storeName] = state[storeName];

		setStateGlobal[storeName] = (input) => {
			if (typeof input === "function") {
				let callback = input;
				return setState((state) => ({
					...state,
					[storeName]: callback(state[storeName]),
				}));
			}

			return setState({ [storeName]: input });
		};
	} else if (!setStateGlobal[storeName]) {
		throw new Error(
			`Heyy💃💃.., you missed it😬.\n\n\n💡💡Hint: You must give 'defaultValue' 😛😛 at the time of initializing the store. \n\n\nSo, in your case it should be -\n\n\n ️❤️️❤️const [${storeName}, ${
				"set" + capitalizeFirstLetter(storeName)
			}] = useStateGlobal('${storeName}', defaultValue)️❤️️❤️${"\n".repeat(5)}`
		);
	}

	return [stateGlobal[storeName], setStateGlobal[storeName]];
};
