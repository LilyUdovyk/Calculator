// Checks whether the last entered character is an operator
export const checkLastAction = (expression: string) => {
    const actions = /[+/\-x*.]$/;

  return actions.test(expression);
};

// Checks whether the last entered character is 0
export const checkZeroDigit = (expression: string) => expression === '0';

// Checks whether the last entered character is "."
export const isDot = (expression: string) => expression === '.';

// Checks whether the last entered character is a number
export const isNumber = (value: string) => {
  const numbers = /[0-9]/;

  return numbers.test(value);
};
