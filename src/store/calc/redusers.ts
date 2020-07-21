import { getType } from "typesafe-actions";

import * as actions from "./actions";
import { CalcState, CalcAction } from "./types";

const initialState: CalcState = {
    value: 0,
};

export default (
  state: CalcState = initialState,
  action: CalcAction
): CalcState => {
  switch (action.type) {
    case getType(actions.addElem):
        return{
            ...state,
            value: state.value === 0 ? +action.payload : state.value + +action.payload
        }
    case getType(actions.clear):
        return{
            ...state,
            value: 0
        }
    case getType(actions.equal):
        return{
            ...state,
            value: eval(action.payload)
        }
    default:
        return state;
    }
};