import React from 'react';
import styled from "styled-components";
import GlobalStyle from "./theme";
import Container from "./components/Container";
import {Provider} from "react-redux";
import store from "./store/store";

const AppWrapper = styled.div`
  background-color: #F3F7FA;
`

const App = () => {
  return (
      <Provider store={store}>
          <GlobalStyle />
          <AppWrapper>
              <Container/>
          </AppWrapper>
      </Provider>
  );
}

export default App;
