import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import shuntingYard from '../helpers/shuntingYard';
import NumberPad from './numbePad';


const CalDiv = styled.div`
    height: 100%
`

const DisplayDiv = styled.div`
    height: 40%;
    font-size: xx-large;
    display: grid;
    overflow-y: auto;
    background: #051821;
    color: #F8BC24;
`

const DisplaySpan = styled.span`
    justify-self: end;
    align-self: end;
    overflow-wrap: anywhere;
`
const numbers = "0123456789.";

const merge_input: (value: string, keyboard: string) => string = (value, keyboard) => {
    let prevValue = value == "0" ? "" : value
    if (keyboard === "Backspace") {
        prevValue = prevValue.substring(0, prevValue.length-1)
    }

    const operands = "/*-+";
    const keyInput = (numbers+operands).includes(keyboard) ? keyboard : ""
    const output = (prevValue+keyInput) == "" ? "0" : (prevValue+keyInput)
    return output
}

const calculate: (value: string) => string = (value) => {
    return shuntingYard(value)
}

const Calculator: React.FC<{}> = () => {
    const [value, setValue] = useState("0");
    
    const keyboard_input = (e) => {
        // Need to handle case where value starts with operands. Cannot happen.
        console.log(e)
        if (e.key === 'Enter') {
            setValue(prev => calculate(prev))
        } else if (e.key === 'Clear') {
            setValue("0")
        } else {
            setValue(prev => merge_input(prev, e.key)) 
        }
    }

    const input = (value) => () => { keyboard_input(value) }

    // Learnings: useEffect to connect with global objects
    useEffect(() => {
        document.addEventListener('keydown', keyboard_input);
        return () => {
            document.removeEventListener('keydown', keyboard_input);
        }
    }, [])

    return (
        <CalDiv>
            <DisplayDiv>
                <DisplaySpan>{value}</DisplaySpan>
            </DisplayDiv>
            <NumberPad input={input} />
        </CalDiv>
    )
  }

export default Calculator;