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
