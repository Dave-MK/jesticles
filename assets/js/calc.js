function addition(num1, num2) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return NaN; // Return NaN if inputs are not numbers
  } else if (num1 === "undefined" || num2 === "undefined") {
    return null; // Return null if inputs are undefined
  } else {
    return num1 + num2;
  }
}

module.exports = addition;