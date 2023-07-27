import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../../../theme/colors.const';
import { SPACES } from '../../../../theme/spaces.const';

export const TodoContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const AddTodoButton = styled(Link)`
  background-color: ${COLORS.backgroundButton};
  color: black;
  padding: ${SPACES.xs} ${SPACES.xm};
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 10px;
  &:hover {
    background-color: ${COLORS.backgroundFocus};
  }
`;
export const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SPACES.xm};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: ${SPACES.m};
`;
