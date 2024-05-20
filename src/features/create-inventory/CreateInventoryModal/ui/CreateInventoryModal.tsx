import { ReactElement } from 'react';
import styles from './CreateInventoryModal.module.scss';
import { Button, CircularProgress, TextField } from '@mui/material';
import { textFieldsConfig, useCreate } from '../lib';
import { TEquipment } from '../../../../shared';

function CreateInventoryModal(): ReactElement {
  const { inventory, handleChange, handleSubmit, isLoading } = useCreate({});

  return (
    <div className={styles.wrapper}>
      <div>
        <h3>Добавить оборудование</h3>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <div className={styles.grid}>
            {textFieldsConfig.map((item) => (
              <TextField
                label={item.label}
                name={item.name}
                size="small"
                value={inventory[item.name as keyof Omit<TEquipment, 'id'>]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
        {isLoading ? (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        ) : (
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        )}
      </form>
    </div>
  );
}

export default CreateInventoryModal;
