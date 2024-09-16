export const UrlToHeading = (string) => {
  // Take out the first word (/add-product) => add
  const firstValue = string.split("/")[1]?.includes("-")
    ? string.split("/")[1]?.split("-")[0]
    : string.split("/")[1];

  // Take out the last word (/add-product) => product
  const lastValue = string.split("/")[1]?.includes("-")
    ? string.split("/")[1]?.split("-")[1]
    : string.split("/")[1];

  // Make the firstValue's first word, uppercase ( Add )
  const upperCasedValue =
    firstValue.split("")[0].toUpperCase() + firstValue.slice(1);

  // Make the last value's first word uppercase ( Product )
  const lastOne = lastValue.split("")[0].toUpperCase() + lastValue.slice(1);

  // If there's was "-" into the url than we'll send the combined value else the first value with uppercase letters
  const finalValue = string?.includes("-")
    ? `${upperCasedValue} ${lastOne}`
    : upperCasedValue;

  return finalValue;
};

export const arrayOfPerPage = (products) =>
  Array.from({ length: products?.length / 10 }, (_, i) => (i + 1) * 10);

export const eachCapitalize = (string) => {
  const firstSplittedWord = string?.split("_")[0];
  const secondSplittedWord = string?.split("_")[1];

  const capitalizeFirstWord =
    firstSplittedWord?.split("")[0].toUpperCase() +
    firstSplittedWord?.split("")?.slice(1).join("");

  const capitalizeSecondWord =
    secondSplittedWord?.split("")[0].toUpperCase() +
    secondSplittedWord?.split("")?.slice(1).join("");

  return `${capitalizeFirstWord} ${capitalizeSecondWord}`;
};
