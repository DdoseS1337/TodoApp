import styled from 'styled-components';
import { Devices } from '../../../../../theme/divices.const';

export const DesktopTodoListContainer = styled.div`
  display: table;

  @media (max-width: ${Devices.DESKTOP}px) {
    display: none;
  }
`;
