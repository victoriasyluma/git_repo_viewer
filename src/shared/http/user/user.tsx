import axios from 'axios';
import { UserMeta, PaginatedResult, Repository, User } from '.';

const BASE = 'https://api.github.com';
const PAGE_SIZE = 30;

export const getUserRepositories = async ({
  login,
  page,
}: {
  page: number;
  login: string;
}): Promise<Repository[]> => {
  const result = await axios.get<Repository[]>(
    `${BASE}/users/${login}/repos?page=${page}`
  );

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
}) => {
  const sanitatedFilter = filter.trim().toLocaleLowerCase();

  const result = await axios.get<PaginatedResult<UserMeta>>(
    `${BASE}/search/users?q=${sanitatedFilter}&page=${page}&per_page=${PAGE_SIZE}`
  );

  return result.data;
};
