import styled from 'styled-components';
import { SIZES } from '../../../../theme/fonts.const';
import { COLORS } from '../../../../theme/colors.const';

export const FooterWrapper = styled.footer`
  background-color: ${COLORS.secondary};
  padding: ${SIZES.m};
`;

export const Copyright = styled.p`
  font-size: ${SIZES.m};
  color: ${COLORS.white};
`;
export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;
