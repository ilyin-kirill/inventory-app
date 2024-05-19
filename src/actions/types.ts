export enum ActionType {
  CreateInventory = 'CreateInventory',
}

export type TAction = {
  type: ActionType | null;
};

export type TActionResult = {
  action: TAction;
  handleOpenCreateInventoryPopup: () => void;
  handleClearAction: () => void;
};
