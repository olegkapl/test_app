import React, {useEffect} from 'react';
import styled from "styled-components";
import PassList from "./PassList";
import Filters from "./Filters";
import HeaderButtons from "./HeaderButtons";
import {useDispatch} from "react-redux";
import {getFlights} from "../store/actions/flights";
// @ts-ignore
import logo from "../figmaSrc/Logo.png";

const ContainerWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`

const ContainerInner = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  max-width: 960px;
  min-width: 960px;
  margin: 0 auto;
`

const Logo = styled.img`
  width: 60px;
  height: 60px;
`
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Content = styled.div`
  padding: 0 20px 0 20px;
`

const Container = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFlights())
    }, [dispatch])

    return (
        <ContainerInner>
            <LogoContainer>
                <Logo src={logo}/>
            </LogoContainer>
            <ContainerWrapper>
                <Filters/>
                <Content>
                    <HeaderButtons />
                    <PassList />
                </Content>
            </ContainerWrapper>
        </ContainerInner>

    );
};

export default Container;
