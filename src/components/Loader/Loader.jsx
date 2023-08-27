import { Overlay } from 'components';
import { PacmanLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <Overlay>
      <PacmanLoader color="#32bbee" />
    </Overlay>
  );
};
