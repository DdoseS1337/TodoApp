import styled from 'styled-components';
import { Devices } from '../../../../../theme/divices.const';

export const MobileTodoListContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${Devices.TABLET}px) {
    display: none;
  }
`;
