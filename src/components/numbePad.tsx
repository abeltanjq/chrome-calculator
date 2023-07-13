import React from "react";
import styled from 'styled-components'
import Grid from '@mui/material/Grid';

const GridContainer = ({ className, children }) => (
    <Grid className={className} container spacing={0} >
        {children}
    </Grid>
)

const StyledGridContainer = styled(GridContainer)`
    height: 60%;
`

// Colour scheme: Orange Drip from -> https://hookagency.com/blog/color-schemes/
const CalButton = styled.button`
    font-size: xx-large;
    width: 100%;
    height: 100%;
    background: #F58800;
    border-color: #1A4645;
    color: azure;
`

const numbers = "789-456*123/"

interface Prop {
    input: (key: object) => () => void
}
const NumberPad: React.FC<Prop> = (prop: Prop) => {
    const number_buttons = numbers.split("")
                            .map((num) => {
                                const key = {key: `${num}`}
                                return (<Grid key={"numpad-"+num} item xs={3}>
                                    <CalButton onClick={prop.input(key)}>
                                        {num}
                                    </CalButton>
                                </Grid>)
                            })
    return (
        <StyledGridContainer>
            <Grid item xs={6} key={"numpad-clear"} >
                <CalButton onClick={prop.input({key: 'Clear'})}>Clear</CalButton>
            </Grid>
            <Grid item xs={3} key={"numpad-brackets"}>
                <CalButton onClick={() => {}}>{"()"}</CalButton>
            </Grid>
            <Grid item xs={3} key={"numpad-+"}>
                <CalButton onClick={prop.input({key: "+"})}>+</CalButton>
            </Grid>
            {number_buttons}
            <Grid item xs={6} key={"numpad-0"}>
                <CalButton onClick={prop.input({key: "0"})}>0</CalButton>
            </Grid>
            <Grid item xs={3} key={"numpad-."}>
                <CalButton onClick={prop.input({key: "."})}>.</CalButton>
            </Grid>
            <Grid item xs={3} key={"numpad-="}>
                <CalButton onClick={prop.input({key: "Enter"})}>=</CalButton>
            </Grid>
        </StyledGridContainer>
    )
}

export default NumberPad;