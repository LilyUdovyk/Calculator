export const checkLastAction = (expression: string) => {
    const actions = /[+/\-x*.]$/;

  return actions.test(expression);
};

export const checkZeroDigit = (expression: string) => expression === '0';

export const isDot = (expression: string) => expression === '.';

export const isNumber = (value: string) => {
  const numbers = /[0-9]/;

  return numbers.test(value);
};
