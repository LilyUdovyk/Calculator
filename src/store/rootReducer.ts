import { combineReducers } from 'redux'

import calcReducer from './calc/redusers'
import { CalcAction } from './calc/types'
import { StateType } from 'typesafe-actions'

const rootReducer = combineReducers({
    calc: calcReducer
})

export type IRootState = StateType<typeof rootReducer>
export type IRootAction = CalcAction

export default rootReducer