import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { useParams } from 'react-router-dom';
import {
  getUserRepositories,
  getUser,
  useSelectedUser,
  Repository,
  User,
} from '../../shared';
import { isNil } from 'react-global-state-hooks';

export const Repositories = () => {
  const { login } = useParams<{ login: string }>();
  const [selectedUser, setSelectedUser] = useSelectedUser();
  const [isLoading, setIsLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    (async () => {
      const user = await getUser(login);

      setSelectedUser(user);
    })();
  }, []);

  const loadData = useMemo(
    () => async (params: { page: number; user: User }) => {
      try {
        setIsLoading(true);

        const repositories = await getUserRepositories(params);

        setRepositories((current) => [...current, ...repositories]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadData({ page, user: selectedUser });
  }, [page, selectedUser]);

  useEffect(() => {
    if (isNil(selectedUser?.public_repos) || isLoading) return;

    const handleScroll = debounce(() => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      const isBottomReached = scrollTop + clientHeight >= scrollHeight - 10;
      const shouldLoadMore = selectedUser?.public_repos > repositories.length;

      if (!isBottomReached || !shouldLoadMore) return;

      setPage((prevPage) => prevPage + 1);
    }, 100);

    globalThis.addEventListener('scroll', handleScroll);

    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, selectedUser?.public_repos, repositories.length]);

  return (
    <div>
      <ul>
        {repositories.map((repo) => {
          return (
            <li className="h-9 " key={repo.id}>
              <h1>{repo.name}</h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
