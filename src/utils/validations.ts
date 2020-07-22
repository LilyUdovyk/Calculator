// Checks whether the last character is an operator
export const checkLastAction = (expression: string) => {
    const actions = /[+/\-x*.]$/;

  return actions.test(expression);
};

// Checks whether the last character of input is 0
export const checkZeroDigit = (expression: string) => expression === '0';

// Checks whether the last character of input is "."
export const isDot = (expression: string) => expression === '.';

// Checks whether the last character of input is number
export const isNumber = (value: string) => {
  const numbers = /[0-9]/;

  return numbers.test(value);
};
