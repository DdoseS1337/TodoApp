import React from 'react';
import { FooterWrapper, Copyright, FooterContainer } from './Footer.styled';

export const Footer = () => (
  <FooterContainer>
    <FooterWrapper>
      <Copyright>&copy; {new Date().getFullYear()} Yaroslav </Copyright>
    </FooterWrapper>
  </FooterContainer>
);
