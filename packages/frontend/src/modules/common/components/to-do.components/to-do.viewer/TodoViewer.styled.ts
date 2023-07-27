import styled from 'styled-components';
import { SPACES, COLORS, FONTS } from '../../../../theme';

export const TodoViewerContainer = styled.div`
  padding: ${SPACES.l};
  border: 1px solid ${COLORS.secondary};
  border-radius: 4px;
  background-color: ${COLORS.todoBackgoundColor};
  max-width: 600px;
  margin: 0 auto;
`;

export const TodoViewerButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACES.s};
`;

export const Title = styled.h2`
  font-size: ${FONTS.SIZES.m};
  font-weight: ${FONTS.WEIGHTS.bold};
  color: ${COLORS.primaryText};
  text-transform: uppercase;
  margin-bottom: ${SPACES.m};
  margin-left: ${SPACES.l};
  padding-bottom: ${SPACES.m};
  overflow-wrap: break-word;
`;
export const Description = styled.p`
  color: ${COLORS.secondary};
  text-transform: lowercase;
  margin-bottom: ${SPACES.m};
  &::first-letter {
    text-transform: capitalize;
  }
  margin-left: ${SPACES.l};
  padding-bottom: ${SPACES.m};
  overflow-wrap: break-word;
`;
