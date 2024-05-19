import { createContext } from 'react';
import { TActionResult } from './types';

export const ActionsContext = createContext<Partial<TActionResult>>({});
