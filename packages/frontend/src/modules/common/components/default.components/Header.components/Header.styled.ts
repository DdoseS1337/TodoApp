import styled from 'styled-components';

import { SIZES } from '../../../../theme/fonts.const';
import { COLORS } from '../../../../theme/colors.const';

export const HeaderWrapper = styled.header`
  background-color: ${COLORS.primary};
  padding: ${SIZES.l};
`;

export const Heading = styled.h1`
  font-size: ${SIZES.l};
  color: ${COLORS.white};
`;
export const HeaderContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
`;
