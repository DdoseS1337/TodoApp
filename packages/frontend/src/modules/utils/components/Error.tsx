import React from 'react';

import { ErrorTextStyled } from './Error.styled';
import { PreloaderContainer } from './Preloader.styled';

const ErrorText: React.FC = (error) => (
  <PreloaderContainer>
    <ErrorTextStyled>{error}</ErrorTextStyled>
  </PreloaderContainer>
);

export default ErrorText;
