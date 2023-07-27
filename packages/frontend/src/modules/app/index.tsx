import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { MainRouter } from '../navigation';

import * as theme from '../theme';
import * as Styled from './app.styled';
import '../../style.css';

import { MainContainer } from '../navigation/MainRouter.styled';
import { Header } from '../common/components/default.components/Header.components/Header';
import { Footer } from '../common/components/default.components/Footer.components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity
    }
  }
});

const AppContainer = () => (
  <ThemeProvider theme={theme}>
    <Styled.GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <Header />
      <MainContainer>
        <MainRouter />
      </MainContainer>
      <Footer />
    </QueryClientProvider>
  </ThemeProvider>
);

export default AppContainer;
