import { createAction } from "typesafe-actions";

export const addElem = createAction(
  "calc/ADD_ELEM", (text: string) => text
)();

export const clear = createAction(
    "calc/CLEAR"
)();

export const equal = createAction(
    "calc/EQUAL", (value: string) => value
)();