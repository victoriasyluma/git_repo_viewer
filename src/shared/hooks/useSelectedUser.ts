import { createGlobalState } from 'react-global-state-hooks';
import { User } from '..';

export const useSelectedUser = createGlobalState<User | null>(null);
