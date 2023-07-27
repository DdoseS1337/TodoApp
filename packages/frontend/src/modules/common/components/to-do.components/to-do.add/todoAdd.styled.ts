import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SPACES, FONTS, COLORS } from '../../../../theme';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const CreateButton = styled.button`
  background: ${COLORS.backgroundButton};
  border-radius: 4px;
  border: 2px solid #1ba95d;
  color: ${COLORS.primaryText};
  padding: ${SPACES.m} ${SPACES.m};
  font-size: ${FONTS.SIZES.m};
  margin-top: ${SPACES.s};
  cursor: pointer;
  &:hover,
  &:focus {
    background: ${COLORS.backgroundFocus};
  }
`;

export const BackLink = styled(Link)`
  color: ${COLORS.primaryText};
  text-decoration: none;
  margin-top: ${SPACES.s};
  font-size: ${FONTS.SIZES.m};
  &:hover {
    text-decoration: underline;
  }
`;
