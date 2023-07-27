import styled from 'styled-components';
import { SPACES, FONTS, COLORS } from '../../../../theme';

export const Title = styled.h2`
  flex: 1;
  font-size: ${FONTS.SIZES.m};
  font-weight: ${FONTS.WEIGHTS.bold};
  color: ${COLORS.primaryText};
  text-transform: uppercase;
  margin-bottom: ${SPACES.m};
  margin: 0 ${SPACES.l};
  text-align: center;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Description = styled.p`
  flex: 2;
  color: ${COLORS.secondary};
  text-transform: lowercase;
  margin-bottom: ${SPACES.m};
  &::first-letter {
    text-transform: capitalize;
  }
  margin: 0 ${SPACES.l};
  text-align: center;
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Button = styled.button`
  background: ${COLORS.backgroundButton};
  border-radius: 4px;
  border: 2px solid #1ba95d;
  color: ${COLORS.primaryText};
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${COLORS.backgroundFocus};
  }

  & + & {
    margin-left: ${SPACES.xs};
  }
`;

export const TodoElementContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${SPACES.xs};
  border: 1px solid #ccc;
  margin-bottom: ${SPACES.xs};
`;

export const TodoDetailsContainer = styled.div`
  flex: 1;
`;

export const TodoActionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${SPACES.xs};

  p {
    margin-right: 5px;
  }
`;
