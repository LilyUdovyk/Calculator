import * as Validations from './validations';

export const {
  checkLastAction, checkZeroDigit, isNumber, isDot
} = Validations;

export const deleteElement = (expression: string, quantity: number) => {
  let output = expression.split('');

  if (output.length > 1) {
    return output.slice(0, output.length - quantity).join('');
  }

  return '0';
};

export const changeElement = (expression: string, value: string, quantity: number) => {
  let modifiedExpression = expression.split('');

  modifiedExpression[quantity] = value;

  return modifiedExpression.join('');
};

export const changeLastElement = (expression: string, value: string, quantity: number) => {
  let modifiedExpression = expression.split('');

  modifiedExpression[expression.length - quantity] = value;

  return modifiedExpression.join('');
};

export const findIndexLastOperator = (expression: string) => {
  return Math.max(
    expression.lastIndexOf('-'), 
    expression.lastIndexOf('+'), 
    expression.lastIndexOf('*'), 
    expression.lastIndexOf('/')
  )
};

export const findLastOperand = (expression: string) => {
  return expression.slice(findIndexLastOperator(expression) + 1)
}

