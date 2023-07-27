import styled from 'styled-components';
import { Devices } from '../../../../../theme/divices.const';
import { SPACES } from '../../../../../theme/spaces.const';

export const TabletTodoListContainer = styled.div`
  width: 80%;
  padding: ${SPACES.xm};

  @media (min-width: ${Devices.DESKTOP}px) {
    display: none;
  }

  @media (max-width: ${Devices.TABLET}px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
