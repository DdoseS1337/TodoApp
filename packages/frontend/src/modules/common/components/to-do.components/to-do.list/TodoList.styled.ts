import styled from 'styled-components';
import { Devices } from '../../../../theme/divices.const';

export const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${Devices.DESKTOP}px) {
    display: table;
  }

  @media (min-width: ${Devices.TABLET}px) and (max-width: ${Devices.DESKTOP}px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
