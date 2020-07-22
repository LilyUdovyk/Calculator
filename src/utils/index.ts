import * as Validations from './validations';

export const {
  checkLastAction, checkZeroDigit, isNumber, isDot
} = Validations;

// Removes the specified quantity of elements from the end
export const deleteElement = (expression: string, quantity: number) => {
  let output = expression.split('');

  if (output.length > 1) {
    return output.slice(0, output.length - quantity).join('');
  }

  return '0';
};

// Replaces the element expression[quantity] with the value
export const changeElement = (expression: string, value: string, quantity: number) => {
  let modifiedExpression = expression.split('');

  modifiedExpression[quantity] = value;

  return modifiedExpression.join('');
};

// Replaces the element expression[quantity] with the value from the end
export const changeLastElement = (expression: string, value: string, quantity: number) => {
  let modifiedExpression = expression.split('');

  modifiedExpression[expression.length - quantity] = value;

  return modifiedExpression.join('');
};

// Find index of last operator
export const findIndexLastOperator = (expression: string) => {
  return Math.max(
    expression.lastIndexOf('-'), 
    expression.lastIndexOf('+'), 
    expression.lastIndexOf('*'), 
    expression.lastIndexOf('/')
  )
};

// Find value of last operand
export const findLastOperand = (expression: string) => {
  return expression.slice(findIndexLastOperator(expression) + 1)
}

