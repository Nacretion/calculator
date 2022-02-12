import React from 'react';
import MyButton from "./UI/MyButton/MyButton";

const KeyBoard = ({setValue}, {value}) => {


    return (
        <div className="keyBoard">
                <MyButton onClick={() => setValue('')}>AC</MyButton>
                <MyButton onClick={() => setValue(value.slice(0,-1))}>&#9003;</MyButton>
                <MyButton>&#37;</MyButton>
                <MyButton>&#247;</MyButton>

                <MyButton onClick={() => setValue(value + "7")}>7</MyButton>
                <MyButton>8</MyButton>
                <MyButton>9</MyButton>
                <MyButton>&#215;</MyButton>

                <MyButton>4</MyButton>
                <MyButton>5</MyButton>
                <MyButton>6</MyButton>
                <MyButton>&#8722;</MyButton>

                <MyButton>1</MyButton>
                <MyButton>2</MyButton>
                <MyButton>3</MyButton>
                <MyButton>&#43;</MyButton>

                <MyButton>&#177;</MyButton>
                <MyButton>0</MyButton>
                <MyButton>&#8901;</MyButton>
                <MyButton>&#61;</MyButton>
        </div>
    );
};

export default KeyBoard;