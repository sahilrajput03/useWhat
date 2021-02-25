export const myError = (storeName) => {
	throw new Error(
		`Heyy💃💃.., you missed it😬.\n\n💡💡Hint: You must give 'defaultValue' 😛😛 at the time of initializing the store. \n\nSo, in your case it should be -\n\n ️❤️️❤️const [${storeName}, ${
			"set" + capitalizeFirstLetter(storeName)
		}] = useWhat('${storeName}', defaultValue)️❤️️❤️${"\n".repeat(5)}`
	);
};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const myErrorForNoStore = (storeName) => {
	throw new Error(
		`Heyy💃💃.., you missed it😬.\n\n💡💡Hint: You must give the initialise the namespace for global state using 'useWhat' api in your component before using 'getWhat' api in underneath components. \n\nSo, in your case it should be -\n\n ️❤️️❤️const [${storeName}, ${
			"set" + capitalizeFirstLetter(storeName)
		}] = useWhat('${storeName}', optionalDefaultValue)️❤️️❤️${"\n".repeat(5)}`
	);
};
