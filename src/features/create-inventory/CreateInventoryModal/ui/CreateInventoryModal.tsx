import { ReactElement } from 'react';
import styles from './CreateInventoryModal.module.scss';
import { Button } from '@mui/material';

function CreateInventoryModal(): ReactElement {
  return (
    <div className={styles.wrapper}>
      <div>
        <h3>Добавить оборудование</h3>
      </div>
      <Button variant="contained">Сохранить</Button>
    </div>
  );
}

export default CreateInventoryModal;
