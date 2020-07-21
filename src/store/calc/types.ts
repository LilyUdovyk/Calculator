import * as actions from './actions'
import { ActionType } from 'typesafe-actions'

export type CalcAction = ActionType<typeof actions>

export type CalcState = {
    value: number
}