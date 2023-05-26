import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getUserRepositories,
  getUser,
  useSelectedUser,
  Repository,
} from '../../shared';

export const Repositories = () => {
  const { login } = useParams<{ login: string }>();
  const [selectedUser, setSelectedUser] = useSelectedUser();
  const [isLoading, setIsLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    // get current user
    (async () => {
      try {
        const getUserPromise = selectedUser
          ? Promise.resolve(selectedUser)
          : getUser(login as string);

        const getUserRepositoriesPromise = getUserRepositories({
          login: login as string,
          page: 1,
        });

        const [user, { items: repositories }] = await Promise.all([
          getUserPromise,
          getUserRepositoriesPromise,
        ]);

        if (!selectedUser) {
          setSelectedUser(user);
        }

        // set the repositories
        setRepositories((current) => [...current, ...repositories]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        {repositories.map((repo) => {
          return (
            <li key={repo.id}>
              <h1>{repo.name}</h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
