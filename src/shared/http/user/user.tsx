import axios from 'axios';
import { User, UserApiResults } from '.';

const BASE = 'https://api.github.com';
const PAGE_SIZE = 30;

export const getUserRepositories = async (login: string) => {
  const result = await axios.get(`${BASE}/users/${login}/repos`);

  return result.data;
};

export const getUser = async (login: string) => {
  const result = await axios.get<User>(`${BASE}/users/${login}`);

  return result.data;
};

export const getUsers = async ({
  filter,
  page,
}: {
  filter: string;
  page: number;
}): Promise<UserApiResults> => {
  const sanitatedFilter = filter.trim().toLocaleLowerCase();

  const result = await axios.get<UserApiResults>(
    `${BASE}/search/users?q=${sanitatedFilter}&page=${page}&per_page=${PAGE_SIZE}`
  );

  return result.data;
};
