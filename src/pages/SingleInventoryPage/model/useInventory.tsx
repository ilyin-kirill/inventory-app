import { useState, RefObject, useContext, ChangeEvent, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { TEquipment, generateQR } from '../../../shared';
import { useNavigate } from 'react-router-dom';
import { ActionsContext } from '../../../actions';
import { defaultInventory } from '../../../features/create-inventory/CreateInventoryModal/lib';

type TParameters = {
  qrCodeRef: RefObject<HTMLImageElement>;
  initialInventory?: TEquipment;
};

export function useInventory({ qrCodeRef, initialInventory }: TParameters) {
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [qrCodeData, setQrCodeData] = useState<string>('');

  const navigate = useNavigate();

  const doc = new jsPDF();

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

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

  const defaultInventory: TEquipment = {
    id: 0,
    account: '',
    characteristics: '',
    code: '',
    code_okei: '',
    count_name: 'шт',
    inventory_num: '',
    pasport: '',
    price: '',
    fact_count: '',
    fact_sum: '',
    accounting_count: '',
    accounting_sum: '',
  };

  const [inventory, setInventory] = useState<TEquipment>(
    initialInventory ?? defaultInventory
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleClearAction } = useContext(ActionsContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setInventory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!inventory?.id) {
      return;
    }

    try {
      setIsLoading(true);

      await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/device/${inventory.id}/`,
        {
          method: 'PUT',
          body: JSON.stringify(inventory),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      handleClearAction?.();

      setOpenSnack(true);

      setTimeout(() => navigate('/inventory'), 1000);
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
    openSnack,
    handleCloseSnack,
    inventory,
    isLoading,
    handleChange,
    handleSubmit,
    onGenerateQR,
  };
}
