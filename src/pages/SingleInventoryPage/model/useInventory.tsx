import { useState, RefObject } from 'react';
import { jsPDF } from 'jspdf';
import { TEquipment, generateQR } from '../../../shared';

type TParameters = {
  qrCodeRef: RefObject<HTMLImageElement>;
};

export function useInventory({ qrCodeRef }: TParameters) {
  const [qrCodeData, setQrCodeData] = useState<string>('');

  const data: TEquipment = JSON.parse(
    localStorage.getItem('inventoryItem') ?? '{}'
  );

  const doc = new jsPDF();

  const onGenerateQR = async () => {
    const qrCode = (await generateQR(window.location.href)) ?? '';
    setQrCodeData(qrCode);

    if (qrCodeRef.current) {
      await doc.html(qrCodeRef.current, {
        callback: function (doc) {
          doc.save(`qr-${data.code}.pdf`);
        },
      });
    }
  };

  return {
    qrCodeData,
    data,
    onGenerateQR,
  };
}
