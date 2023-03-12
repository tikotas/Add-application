import React from "react";
import style from "./CustomInput.module.css";

const CustomInput = ({title, value, name, handleChange}) => {
    return (
        <div className={style.inpBlocks}>
            <h2>{title}</h2>
            <input
                name={name}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export default CustomInput;