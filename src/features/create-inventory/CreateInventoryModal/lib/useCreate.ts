import {
  ChangeEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import { defaultInventory } from './constants';
import { ActionsContext } from '../../../../actions';
import { TEquipment } from '../../../../shared';

type TCreateHookResult = {
  inventory: Omit<TEquipment, 'id'>;
  isLoading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export function useCreate({
  initialInventory,
}: {
  initialInventory?: TEquipment;
}): TCreateHookResult {
  const [inventory, setInventory] =
    useState<Omit<TEquipment, 'id'>>(defaultInventory);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleClearAction } = useContext(ActionsContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInventory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await fetch(`${process.env.REACT_APP_API_URL}/api/v1/device/`, {
        method: 'POST',
        body: JSON.stringify(inventory),
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
    inventory,
    isLoading,
    handleChange,
    // @ts-ignore
    handleSubmit,
  };
}
