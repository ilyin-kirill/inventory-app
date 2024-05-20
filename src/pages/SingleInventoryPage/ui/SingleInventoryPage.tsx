import { ReactElement, useState, useRef, useEffect } from 'react';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import { PageWrapper } from '../../PageWrapper';
import styles from './SingleInventoryPage.module.scss';
import { useInventory } from '../model';
import { TEquipment } from '../../../shared';
import { textFieldsConfig } from '../../../features/create-inventory/CreateInventoryModal/lib';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

function SingleInventoryPage(): ReactElement {
  const qrCodeRef = useRef<HTMLImageElement>(null);

  const { id } = useParams();

  const { data } = useSWR(
    `${process.env.REACT_APP_API_URL}/api/v1/device/${id}/`,
    (url: string) =>
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
    { revalidateOnFocus: false }
  );

  const {
    qrCodeData,
    openSnack,
    onGenerateQR,
    handleCloseSnack,
    inventory,
    isLoading,
    handleChange,
    handleSubmit,
  } = useInventory({ qrCodeRef, initialInventory: data });

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
              {textFieldsConfig.map((item) => (
                <TextField
                  label={item.label}
                  name={item.name}
                  value={inventory?.[item.name as keyof TEquipment]}
                  onChange={handleChange}
                />
              ))}
            </div>
            <Button variant="contained" onClick={handleSubmit}>
              Сохранить изменения
            </Button>
          </div>
          {!!qrCodeData && (
            <img className={styles.image} src={qrCodeData} alt="" />
          )}
          <img
            className={styles.imageTransparent}
            ref={qrCodeRef}
            src={qrCodeData}
            alt=""
          />
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        open={openSnack}
        onClose={handleCloseSnack}
        message="Оборудование успешно сохранено"
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Оборудование успешно сохранено!
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}

export default SingleInventoryPage;
