import React from 'react';
// import { bindActionCreators, Dispatch } from "redux";
// import { connect } from "react-redux";

// import { IRootAction, IRootState } from "../../store/rootReducer";
// import * as calcActions from "../../store/calc/actions";

import style from './style.module.css'
import { checkZeroDigit, checkLastAction, isDot, isNumber, deleteElement, changeElement, changeLastElement, findIndexLastOperator, findLastOperand } from '../../utils';
import Display from '../Display'
import Button from '../Button'

// const mapStateToProps = (state: IRootState) => ({
//     value: state.calc.value
// });

// const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
//   bindActionCreators(
//     {
//         clear: calcActions.clear,
//         equal: calcActions.equal,
//         addElem: calcActions.addElem
//     },
//     dispatch
//   );

const buttons = [ "AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "=" ]

// type CalculatorProps = ReturnType<typeof mapStateToProps> &
//   ReturnType<typeof mapDispatchToProps>;

// const Calculator: React.FC<CalculatorProps> = props => {

const Calculator: React.FC = () => {
    // const [indexLastOperator, setIndexLastOperator] = React.useState<Index>(null);
    const [result, setResult] = React.useState('0');
    const [countDot, setCountDot] = React.useState(0);

    const equalAction = () => {
        if (checkLastAction(result)) {
            setResult((res) => deleteElement(res, 1));
        } else {
            setResult((res) => eval(res).toString());
            if (eval(result) % 1 === 0) {
                setCountDot(0);
            }
        }
    }

    const resetAction = () => {
        setResult('0');
        setCountDot(0);
    }

    const changeOperatorAction = () => {
        if (checkLastAction(result)) return
        let indexLastOperator = findIndexLastOperator(result)
        let lastOperator = result[indexLastOperator]
        if (lastOperator === '+') {
            setResult(changeElement(result, "-", indexLastOperator));
        } else if (lastOperator === '-') {
            setResult(changeElement(result, "+", indexLastOperator));
        } else if (lastOperator === '*' || '/') {
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
        console.log('findLastOperand(result)', findLastOperand(result))
        console.log('absoluteValue', absoluteValue)
        let indexLastOperator = findIndexLastOperator(result)
        let lastOperator = result[indexLastOperator]
        console.log('lastOperator', lastOperator)
        if (lastOperator === '*' || '/') {
            let expression = result.substring(0, indexLastOperator + 1)
            console.log('expression', expression)
            setResult(expression + absoluteValue);
            console.log('result', result)
            equalAction()
        } else if (lastOperator === '+' || '-') {
            let expressionValue = eval(result.substring(0, indexLastOperator))
            console.log('expressionValue', expressionValue)
            setResult(expressionValue + lastOperator + absoluteValue * expressionValue);
            equalAction()
        } else setResult('0')
    }

    const othersActions = (value: string) => {
        if (checkLastAction(value)) {
            if (isDot(value)) {
                setCountDot((count) => count + 1);

                if (countDot < 1) {
                    setResult((res) => res + value);
                }
            } else {
                setCountDot(0);

                if (checkLastAction(result)) {
                    if (value === '-' && result[result.length - 1] !== value) {
                        setResult((res) => res + value);
                    } else if (value !== '-' && result[result.length - 1] === '-' && !(isNumber(result[result.length - 2]))) {
                        setResult((res) => deleteElement(res, 2));
                        setResult((res) => res + value);
                    } else if (value !== '-') {
                        setResult((res) => changeLastElement(res, value, 1));
                    }
                } else {
                    setResult((res) => res + value);
                }
            }
        } else if (checkZeroDigit(result)) {
            setResult(value);
        } else {
            setResult((res) => res + value);
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
                { buttons.map((item: string) => {
                    return (
                        <Button key={item} value={item} onClick={() => {
                            calculate(item)}
                        } />
                    )
                })}
            </div>
        </div>
    )
};
export default React.memo(Calculator);
// export default connect(mapStateToPropsprops, mapDispatchToProps)(React.memo(Calculator));