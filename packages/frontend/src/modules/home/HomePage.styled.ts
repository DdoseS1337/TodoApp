import styled from 'styled-components';
import { SPACES, COLORS } from '../theme';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACES.s}; /* Відстань між кнопками */
`;

export const HomeButton = styled.button`
  background: ${COLORS.backgroundButton};
  border-radius: 4px;
  border: 2px solid #1ba95d;
  color: ${COLORS.primaryText};
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: block;
  margin: 0 auto;
  &:hover {
    background: ${COLORS.backgroundFocus};
  }

  & + & {
    margin-left: ${SPACES.xs};
  }
`;
