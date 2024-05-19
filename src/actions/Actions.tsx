import { ReactElement, useContext } from 'react';
import { Modal, Box } from '@mui/material';
import { ActionsContext } from './ActionsContext';
import { ActionType } from './types';
import { CreateInventoryModal } from '../features';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  padding: '32px',
};

function Actions(): ReactElement | null {
  const { action, handleClearAction } = useContext(ActionsContext);

  const result = action?.type
    ? {
        [ActionType.CreateInventory]: {
          render: () => <CreateInventoryModal />,
        },
      }
    : null;

  return (
    <Modal
      open={!!action?.type}
      onClose={handleClearAction}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{result?.[action?.type as ActionType].render()}</Box>
    </Modal>
  );
}

export default Actions;
