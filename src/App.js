import './styles/App.css';
import MyInput from "./components/UI/MyInput/MyInput";
import React, {useEffect, useState} from "react";
import MyButton from "./components/UI/MyButton/MyButton";
import {xRound} from "./utils/mathFunctions";
/*
    Value - last element that's not an operation, if you'll add any operation - value will become empty

 */


function App() {
    const [value, setValue] = useState('')
    const [values, setValues] = useState([])
    const [lastOperation, setLastOperation] = useState([])
    const [calculatedValue, setCalculatedValue] = useState("")
    const [lastCalculatedValue, setLastCalculatedValue] = useState("")
    const operations = ["+", "-", "*", "/"]

    useEffect(() => {
        try {
            let stringValues = getStringValues("1")
            let result = xRound(eval(stringValues), 6).toString()
            if (result !== "NaN" && values.length > 1) {
                setCalculatedValue(result)
            }
        } catch (e) {
        }
    }, [values])

    const isLastValueOperation = () => {
        // return false if the last value isn't an operation
        return operations.includes(getLastValue())
    }

    const isItOperation = (index) => {
        // return false if value with index = index isn't an operation
        return operations.includes(values[index])
    }

    const getLastValue = () => {
        return values.slice(-1).toString()
    }

    const getInputValue = () => {
        // replace operations to read-free format (it uses only to put it in input
        return replaceString(getStringValues())

    }

    const replaceString = (string) => {
        return string.replaceAll("*", "×")
            .replaceAll("/", "÷")
            .replaceAll("-", "−")
            .replaceAll("+", "+")
    }

    const getStringValues = () => {
        let result = ''
        if (!value && values.length === 0) {
            return value;

        }

        values.map(value => {
            result += removeZeroSymbols(value)
        });

        return result
    }

    const addNewSymbol = (symbol) => {
        let newValue = ''
        if (symbol === "0" && value === "0" ||
            symbol === "." && value.indexOf('.') !== -1
        ) {

        } else {
            newValue = value + symbol

            setValue(newValue)
            if (values.length === 0) {
                setValues([newValue])
            } else if (!isLastValueOperation()) {
                setValues([...(values.slice(0, -1)), newValue])
            } else {
                setValues([...values, newValue])
            }
        }
    }

    const removeSymbol = () => {
        if (value && value.length > 1) {
            let newValue = value.slice(0, -1)
            setValue(newValue)
            setValues([...values.slice(0, -1), newValue])
        } else if (values.length > 1) {
            setValue(values.slice(-2, -1)[0])
            setValues([...values.slice(0, -1)])
        } else {
            setValue("")
            setValues([...values.slice(0, -1)])
        }
    }

    const clearInput = () => {
        if (values) {
            setValues([])
            setValue("")
        }
    }

    const changeSign = () => {
        // TODO : Rewrite this shit :*angry face*:
        if (value) {
            if (value === "0" || value === ".") {

            } else if (values.length === 2 && lastOperation[1] === 0) {
                setValues([...values.slice(0, -2), value])
                setLastOperation([])
            }else if (values.length === 1) {
                setValues([...values.slice(0, -2), "-", value])
                setLastOperation(["-", 0])
            } else if (!isItOperation(lastOperation[1] - 1)) {
                if (lastOperation[0] === "+") {
                    setValues([...values.slice(0, -2), "-", value])
                    setLastOperation(["-", lastOperation[1]])
                } else if (lastOperation[0] === "-") {
                    setValues([...values.slice(0, -2), "+", value])
                    setLastOperation(["+", lastOperation[1]])
                } else if (["*", "/"].includes(lastOperation[0])) {
                    setValues([...values.slice(0, -1), "-", value])
                    setLastOperation(["-", lastOperation[1] + 1])
                }
            } else if ("*" === values[lastOperation[1] - 1]) {
                setValues([...values.slice(0, -2), value])
                setLastOperation(["*", lastOperation[1] - 1])
            } else if ("/" === values[lastOperation[1] - 1]) {
                setValues([...values.slice(0, -2), value])
                setLastOperation(["/", lastOperation[1] - 1])
            }

        }
    }

    function addOperation(operation) {
        if (value === '' && operation === "-" && (!isLastValueOperation() || ["*", "/"].includes(lastOperation[0]))) {
            setValues([...values, operation])
            setValue('')
            setLastOperation([operation, values.length])
        }
        if (value && values[-1] !== operation && !isLastValueOperation()) {
            setValues([...values, operation])
            setValue('')
            setLastOperation([operation, values.length])
        } else if (isLastValueOperation() && operation !== getLastValue()){
            setValues([...(values.slice(0, -1)), operation])
            setLastOperation([operation, values.length - 1])
        }
    }
    const calculate = (parameter) => {
        let result;
        if (value) {
            if (parameter === "%") {
                if (!isLastValueOperation()) {
                    result = (value / 100).toString()

                    setValues([...values.slice(0, -1), result])
                    setValue(result)
                }
            } else {

                let stringValues = getStringValues()

                result = xRound(eval(stringValues), 6).toString()


                setValue(result)
                setValues([result])
                setLastCalculatedValue(replaceString(stringValues) + " = " + result)
            }
        }
    }

    const removeZeroSymbols = (stringValues) => {
        if (stringValues.length > 1 && stringValues[0] === "0" && stringValues[1] !== ".") {
            stringValues = removeZeroSymbols(stringValues.slice(1))
        } return stringValues
    }

    return (
        <div className="App">
            <label className="lastCalculatedValue">{lastCalculatedValue}</label>
            <label className="preCalc">{calculatedValue}</label>
            <MyInput
                name="input"
                readOnly
                placeholder={"0"}
                value={getInputValue()}
            />
            <div className="keyBoard">
                <MyButton className="operationButton" onClick={() => clearInput()}>AC</MyButton>
                <MyButton className="operationButton"  onClick={() => removeSymbol()}><img alt='' src={require('./img/318218.png')}>
                </img></MyButton>
                <MyButton className="operationButton"  onClick={() => calculate("%")}>&#37;</MyButton>
                <MyButton className="operationButton"  onClick={() => addOperation("/")}>&#247;</MyButton>

                <MyButton onClick={() => addNewSymbol("7")}>7</MyButton>
                <MyButton onClick={() => addNewSymbol("8")}>8</MyButton>
                <MyButton onClick={() => addNewSymbol("9")}>9</MyButton>
                <MyButton className="operationButton"  onClick={() => addOperation("*")}>&#215;</MyButton>

                <MyButton onClick={() => addNewSymbol("4")}>4</MyButton>
                <MyButton onClick={() => addNewSymbol("5")}>5</MyButton>
                <MyButton onClick={() => addNewSymbol("6")}>6</MyButton>
                <MyButton className="operationButton"  onClick={() => addOperation("-")}>&#8722;</MyButton>

                <MyButton onClick={() => addNewSymbol("1")}>1</MyButton>
                <MyButton onClick={() => addNewSymbol("2")}>2</MyButton>
                <MyButton onClick={() => addNewSymbol("3")}>3</MyButton>
                <MyButton className="operationButton"  onClick={() => addOperation("+")}>&#43;</MyButton>

                <MyButton className="operationButton"  onClick={() => changeSign()}>&#177;</MyButton>
                <MyButton onClick={() => addNewSymbol("0")}>0</MyButton>
                <MyButton className="operationButton" onClick={() => addNewSymbol(".")}>&#8901;</MyButton>
                <MyButton className="operationButton"  onClick={() => calculate()}>&#61;</MyButton>
            </div>
        </div>
    );
}

export default App;
