import React from "react";

import style from './style.module.css'

interface Props {
    value: string,
    onClick: () => void
}   

const Button = (props: Props) => {
  
  return (  
    <button 
        className={style.button} 
        value={props.value} 
        onClick={props.onClick}
    > 
        {props.value}
    </button>
  );
};
export default React.memo(Button);