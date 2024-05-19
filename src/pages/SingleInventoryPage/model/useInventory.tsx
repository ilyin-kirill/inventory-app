import { useState, RefObject, useContext, ChangeEvent, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { TEquipment, generateQR } from '../../../shared';
import { ActionsContext } from '../../../actions';
import { defaultInventory } from '../../../features/create-inventory/CreateInventoryModal/lib';

type TParameters = {
  qrCodeRef: RefObject<HTMLImageElement>;
  initialInventory?: TEquipment;
};

export function useInventory({ qrCodeRef, initialInventory }: TParameters) {
  const [qrCodeData, setQrCodeData] = useState<string>('');

  const doc = new jsPDF();

  const onGenerateQR = async () => {
    const qrCode = (await generateQR(window.location.href)) ?? '';
    setQrCodeData(qrCode);

    if (qrCodeRef.current) {
      await doc.html(qrCodeRef.current, {
        width: 5,
        windowWidth: 5,
        x: 20,
        y: 20,
        callback: function (doc) {
          doc.save(`qr-${initialInventory?.code}.pdf`);
        },
      });
    }
  };

  const [inventory, setInventory] = useState<TEquipment>(
    initialInventory ?? defaultInventory
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleClearAction } = useContext(ActionsContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInventory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!inventory.id) {
      return;
    }

    try {
      setIsLoading(true);

      await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/device/${inventory.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(inventory),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      handleClearAction?.();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialInventory) {
      return;
    }

    setInventory(initialInventory);
  }, [initialInventory]);

  return {
    qrCodeData,
    inventory,
    isLoading,
    handleChange,
    handleSubmit,
    onGenerateQR,
  };
}
