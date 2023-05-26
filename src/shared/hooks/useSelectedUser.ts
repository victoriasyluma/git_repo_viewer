import { createGlobalStateWithDecoupledFuncs } from 'react-global-state-hooks';
import { SearchUser } from '..';

export const [useSelectedUser, getSelectedUser, setSelectedUser] =
  createGlobalStateWithDecoupledFuncs<SearchUser | null>(null);
