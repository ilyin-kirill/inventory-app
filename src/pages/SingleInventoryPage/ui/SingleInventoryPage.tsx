import { ReactElement, useState, useRef } from 'react';
import { Button, TextField } from '@mui/material';
import { PageWrapper } from '../../PageWrapper';
import styles from './SingleInventoryPage.module.scss';
import { useInventory } from '../model';

function SingleInventoryPage(): ReactElement {
  const qrCodeRef = useRef<HTMLImageElement>(null);
  const { qrCodeData, onGenerateQR, data } = useInventory({ qrCodeRef });

  return (
    <PageWrapper>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1>Единица оборудования</h1>
          <Button variant="contained" onClick={onGenerateQR}>
            Сгенерировать QR-код
          </Button>
        </header>
        <div className={styles.grid}>
          <div className={styles.editWithButton}>
            <div className={styles.edit}>
              <TextField label="Наименование" defaultValue={data.name} />
              <TextField label="Стоимость (руб)" defaultValue={data.price} />
              <TextField label="Номенклатурный код" defaultValue={data.code} />
            </div>
            <Button variant="contained">Сохранить изменения</Button>
          </div>
          {!!qrCodeData && (
            <img
              className={styles.image}
              ref={qrCodeRef}
              src={qrCodeData}
              alt=""
            />
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default SingleInventoryPage;
