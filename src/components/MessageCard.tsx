import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";

const MessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    flex-direction: column;
`

const MessageText = styled.p`
    color: #4A4A4A;
    text-transform: uppercase;
`
const Button = styled.button`
  background: #2196F3;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  border: 1px solid #DFE5EC;
  padding: 8px;
  border-radius: 5px;
`

interface PropType {
    message: string;
    withAction?: boolean;
    buttonText?: string;
    action?: any
}

const MessageCard: any = ({message, withAction, buttonText, action}: PropType): JSX.Element => {

    const dispatch = useDispatch();

    return (
        <MessageContainer>
            <MessageText>{message}</MessageText>
            {
                withAction ? <Button onClick={() => dispatch(action())}>{buttonText}</Button> : <></>
            }
        </MessageContainer>
    )
}

export default MessageCard;