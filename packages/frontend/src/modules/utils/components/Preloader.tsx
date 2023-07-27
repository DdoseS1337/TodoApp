// Preloader.tsx
import React from 'react';
import { PreloaderContainer, Spinner } from './Preloader.styled';

const Preloader: React.FC = () => (
  <PreloaderContainer>
    <Spinner />
  </PreloaderContainer>
);

export default Preloader;
