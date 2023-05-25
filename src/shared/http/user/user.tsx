import axios from 'axios';
import { GetUsersResult } from '.';

const BASE = 'https://api.github.com';
const PAGE_SIZE = 30;

export const getRepositoriesByUserName = async (username: string) => {
  const result = await axios.get(`${BASE}/users/${username}/repos`);

  return result.data;
};

export const getUsers = async ({
  filter,
  page,
}: {
  filter: string;
  page: number;
}): Promise<GetUsersResult> => {
  const sanitatedFilter = filter.trim().toLocaleLowerCase();

  const result = await axios.get<GetUsersResult>(
    `${BASE}/search/users?q=${sanitatedFilter}&page=${page}&per_page=${PAGE_SIZE}`
  );

  return result.data;
};
