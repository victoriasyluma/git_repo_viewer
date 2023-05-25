import { createGlobalStateWithDecoupledFuncs } from 'react-global-state-hooks';
import { User } from '..';

export const [useSelectedUser, getSelectedUser, setSelectedUser] =
  createGlobalStateWithDecoupledFuncs<User | null>(null);
