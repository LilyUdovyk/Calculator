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

    const equalAction = () => {
        if (checkLastAction(result)) {
            setResult(deleteElement(result, 1));
        } else {
            let res = eval(result).toFixed(15)
            let numericResult = +res
            setResult(numericResult.toString());
            if (eval(result) % 1 === 0) {
                setCountDot(0);
            }
        }
    }

    const resetAction = () => {
        setResult('0');
        setCountDot(0);
    }

    // Replaces '+' with '-' and '-' with '+'
    const changeOperatorAction = () => {
        if (checkLastAction(result)) return
        let indexLastOperator = findIndexLastOperator(result)
        let lastOperator = result[indexLastOperator]
        if (lastOperator === '+') {
            setResult(changeElement(result, "-", indexLastOperator));
        } else if (lastOperator === '-') {
            setResult(changeElement(result, "+", indexLastOperator));
        } else if (lastOperator === '*' || lastOperator === '/') {
            let expression = result.substring(0, indexLastOperator + 1)
            let lastOperand= findLastOperand(result)
            setResult(expression + '-' + lastOperand);
        } else {
            setResult('-' + result);
        }
    }

    const findPercentageAction = () => {
        if (checkLastAction(result)) return
        setResult((res) => deleteElement(res, 1));
        let absoluteValue= +findLastOperand(result) / 100
        let indexLastOperator = findIndexLastOperator(result)
        let lastOperator = result[indexLastOperator]
        if (lastOperator === '*' || lastOperator === '/') {
            let expression = result.substring(0, indexLastOperator + 1)
            setResult(expression + absoluteValue);
            equalAction()
        } else if (lastOperator === '+' || lastOperator === '-') {
            let expressionValue = eval(result.substring(0, indexLastOperator))
            setResult(expressionValue + lastOperator + absoluteValue * expressionValue);
            equalAction()
        } else setResult(absoluteValue.toString())
    }

    const othersActions = (value: string) => {
        if (checkLastAction(value)) {
            if (isDot(value)) {
                setCountDot(countDot + 1);

                if (countDot < 1) {
                    setResult(result + value);
                }
            } else {
                setCountDot(0);

                if (checkLastAction(result)) {
                    if (value === '-' && result[result.length - 1] !== value) {
                        setResult(result + value);
                    } else if (value !== '-' && result[result.length - 1] === '-' && !(isNumber(result[result.length - 2]))) {
                        setResult(deleteElement(result, 2));
                        setResult(result + value);
                    } else if (value !== '-') {
                        setResult(changeLastElement(result, value, 1));
                    }
                } else {
                    setResult(result + value);
                }
            }
        } else if (checkZeroDigit(result)) {
            setResult(value);
        } else {
            setResult(result + value);
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