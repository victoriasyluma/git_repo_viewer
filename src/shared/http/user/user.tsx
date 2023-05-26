import axios from 'axios';
import { SearchUser, PaginatedResult, Repository } from '.';

const BASE = 'https://api.github.com';
const PAGE_SIZE = 30;

export const getUserRepositories = async ({
  login,
  page,
}: {
  login: string;
  page: number;
}): Promise<PaginatedResult<Repository>> => {
  const result = await axios.get<PaginatedResult<Repository>>(
    `${BASE}/users/${login}/repos?page=${2}&per_page=${PAGE_SIZE}`
  );

  return result.data;
};

export const getUser = async (login: string) => {
  const result = await axios.get<SearchUser>(`${BASE}/users/${login}`);

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

  const result = await axios.get<PaginatedResult<SearchUser>>(
    `${BASE}/search/users?q=${sanitatedFilter}&page=${page}&per_page=${PAGE_SIZE}`
  );

  return result.data;
};
