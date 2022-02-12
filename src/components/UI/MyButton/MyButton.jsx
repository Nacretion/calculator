import React from 'react';
import classes from "./MyButton.module.css";

const MyButton = ({className = "", ...props}) => {
    className = classes.myButton + " " + className
    return (
        <button
            className={className}
            {...props}
        >
        </button>
    );
};

export default MyButton;