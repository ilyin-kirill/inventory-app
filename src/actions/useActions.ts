import { useState } from 'react';
import { ActionType, TAction, TActionResult } from './types';

export function useActions(): TActionResult {
  const [action, setAction] = useState<TAction>({ type: null });

  const handleClearAction = () => {
    setAction({ type: null });
  };

  const handleOpenCreateInventoryPopup = () => {
    setAction({ type: ActionType.CreateInventory });
  };

  return {
    action,
    handleClearAction,
    handleOpenCreateInventoryPopup,
  };
}
