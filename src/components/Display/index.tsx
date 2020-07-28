import React from "react";

import style from './style.module.css'

interface Props {
    value: string,
}   

const Display = (props: Props) => {
  
  return (  
    <div className={style.valueContainer}>{props.value}</div>
  )
}
export default React.memo(Display);