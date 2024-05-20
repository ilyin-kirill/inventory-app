import { ReactElement, memo, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './ScannerPage.module.scss';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { PageWrapper } from '../PageWrapper';
import { useNavigate } from 'react-router-dom';

function ScannerPage() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    function success(result: string) {
      scanner.clear();

      window.open(result, '_blank');
    }

    function error(err: string) {
      // Do nothing
    }

    scanner.render(success, error);
  }, []);

  return (
    <PageWrapper>
      <div className={styles.global}>
        <div className={styles.title}>
          <h1>Сканирование QR-кодов</h1>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.reader} id="reader" />
        </div>
      </div>
    </PageWrapper>
  );
}

export default ScannerPage;
