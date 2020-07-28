import React from 'react';

import style from './style.module.css'
import { 
    checkZeroDigit, 
    checkLastAction, 
    isDot,
    isNumber, 
    deleteElement, 
    changeElement, 
    changeLastElement, 
    findIndexLastOperator, 
    findLastOperand
} from '../../utils';
import Display from '../Display'
import Button from '../Button'

const buttonsValue = [ "AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "=" ]

const Calculator: React.FC = () => {
    const [result, setResult] = React.useState('0');
    const [countDot, setCountDot] = React.useState(0);

    // Find the value of the expression
    const equalAction = () => {
        if (checkLastAction(result)) { // if the last entered character is an operator
            setResult(res => deleteElement(res, 1)); // remove this character
        } else { // find the value of the expression corrected for the calculations js (0.1+0.2 -> 0.3)
            setResult(res => String(Number(eval(res).toFixed(15))))
            if (eval(result) % 1 === 0) {
                setCountDot(0);
            }
        }
    }

    // Clears the expression (5+3 -> 0)
    const resetAction = () => {
        setResult('0');
        setCountDot(0);
    }

    // Replaces '+' with '-' and '-' with '+'
    const changeOperatorAction = () => {
        if (checkLastAction(result)) return // if the last entered character is an operator do nothing
        let indexLastOperator = findIndexLastOperator(result)
        let lastOperator = result[indexLastOperator]
        if (lastOperator === '+') { // if the last operator is “+”
            setResult(changeElement(result, "-", indexLastOperator)); // replace it with '-' (5+3 -> 5-3)
        } else if (lastOperator === '-') { // if the last operator is “-”
            setResult(changeElement(result, "+", indexLastOperator)); // replace it with '+' (5-3 -> 5+3)
        } else if (lastOperator === '*' || lastOperator === '/') { // if the last operator is “*” or “/” insert before the operand “-” (5*3 -> 5*-3)
            let expression = result.substring(0, indexLastOperator + 1)
            let lastOperand= findLastOperand(result)
            setResult(expression + '-' + lastOperand);
        } else { // if any operators were entered add "-" before the operand (3 -> -3)
            setResult('-' + result);
        }
    }

    const findPercentageAction = () => {
        if (checkLastAction(result)) return // if the last entered character is an operator do nothing
        setResult(deleteElement(result, 1));
        let absoluteValue= +findLastOperand(result) / 100
        let indexLastOperator = findIndexLastOperator(result)
        let lastOperator = result[indexLastOperator]
        if (lastOperator === '*' || lastOperator === '/') { // if the last operator is '*' or '/'
            let expression = result.substring(0, indexLastOperator + 1)
            setResult(expression + absoluteValue); // replace the last operand with his absolute value (100+100*10% -> 100+100*0.1 -> 110)
            equalAction() // find the value of the expression
        } else if (lastOperator === '+' || lastOperator === '-') { // if the last operator is '+' or '-' 
            let expressionValue = eval(result.substring(0, indexLastOperator))
            setResult(expressionValue + lastOperator + absoluteValue * expressionValue); // add specified proportion of expression (100+100+10% -> 100+100+(100+100)*0.1 -> 220)
            equalAction() // find the value of the expression
        } else setResult(absoluteValue.toString()) // in all other cases set the expression value of his absolute value
    }

    const othersActions = (value: string) => {
        if (checkLastAction(value)) { // if the last entered character is an operator
            if (isDot(value)) { // if the last entered character is '.'
                setCountDot(countDot + 1);

                if (countDot < 1) { // add '.' to the expression
                    setResult(result + value);
                }
            } else {
                setCountDot(0);
                if (checkLastAction(result)) { // if the last character of the expression is an operator
                    if (value === '-' && result[result.length - 1] !== value) { // if the last entered character is '-' and the last character of the expression doesn’t match the last entered character (5+3* -> 5+3*-)
                        setResult(result + value); // add the last entered character to the expression
                    } else if (value !== '-' && result[result.length - 1] === '-' && !(isNumber(result[result.length - 2]))) { // if the last entered character is '-' and the last character of the expression is '-' too and the penultimate character of the expression isn’t number  (5+3*- -> 5+3-)
                        setResult(deleteElement(result, 2)); // remove the last two characters
                        setResult(result + value); // add the last entered character to the expression
                    } else if (value !== '-') { // if the last entered character isn’t '-' (5+3* -> 5+3+)
                        setResult(changeLastElement(result, value, 1)); // replace the last character of the expression with the last entered character
                    }
                } else {
                    setResult(result + value); // in all other cases add the last entered character to the expression (5+3* -> 5+3*2)
                }
            }
        } else if (value === '0' && result[result.length - 1] === '/') { // check division by 0
            return
        } else if (checkZeroDigit(result)) { // if the expression is 0
            setResult(value); // set the expression value of the last entered character (0 -> 2)
        } else {
            setResult(result + value); // in all other cases add the last entered character to the expression (5+3* -> 5+3*2)
        }
    }

    const calculate = (value: string) => {
        switch (value) {
        case 'AC':
            resetAction();
            break;
        case '=':
            equalAction();
            break;
        case '+/-':
            changeOperatorAction();
            break;
        case '%':
            findPercentageAction();
            break;
        default:
            othersActions(value);
            break;
        }
    }

    return (
        <div className={style.calculator}>
            <Display value={result} />
            <div className={style.buttonsContainer}>
                { buttonsValue.map((item: string) => {
                    return (
                        <Button 
                            key = {item} 
                            value = {item} 
                            onClick = {() => calculate(item)}
                        />
                    )
                })}
            </div>
        </div>
    )
};

export default React.memo(Calculator);