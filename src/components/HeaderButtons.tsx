import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {SET_BUTTON_FILTER} from "../store/types/flights";

const HeaderButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    border-radius: 5px;
    width: 502px;
    height: 50px;
    margin-bottom: 15px;
`

const Button = styled.button`
    text-decoration: none;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    color: #4A4A4A;
    text-transform: uppercase;
    font-size: 12px;
    border: 1px solid #DFE5EC;
    &:hover {
        background-color: #F1FCFF;
        cursor: pointer;
    }    
    &.active {
        background: #2196F3;
        color: #FFFFFF;
        border: 1px solid #2196F3;
    }
    &:last-child {
        border-top-right-radius: 5px; 
        border-bottom-right-radius: 5px; 
    }
    &:first-child {
        border-top-left-radius: 5px; 
        border-bottom-left-radius: 5px; 
    }
`

const HeaderButtons = () => {

    const dispatch = useDispatch();

    const currentButton = useSelector((state: RootState) => state.tickets.currentFilter)

    return (
        <HeaderButtonsContainer>
            <Button
                onClick={() => dispatch({type: SET_BUTTON_FILTER, payload: 'lowcost'})}
                className={currentButton === 'lowcost' ? 'active' : ''}
            >
                самый дешёвый
            </Button>
            <Button
                onClick={() => dispatch({type: SET_BUTTON_FILTER, payload: 'fastest'})}
                className={currentButton === 'fastest' ? 'active' : ''}
            >
                самый быстрый
            </Button>
            <Button
                onClick={() => dispatch({type: SET_BUTTON_FILTER, payload: 'optimal'})}
                className={currentButton === 'optimal' ? 'active' : ''}
            >
                оптимальний
            </Button>
        </HeaderButtonsContainer>
    )
}

export default HeaderButtons;
