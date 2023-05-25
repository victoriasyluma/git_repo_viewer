import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserRepositories, getUser, useSelectedUser } from '../../shared';

export const Repositories = () => {
  const { login } = useParams<{ login: string }>();
  const [selectedUser, setSelectedUser] = useSelectedUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // get current user
    (async () => {
      try {
        const getUserPromise = selectedUser
          ? Promise.resolve(selectedUser)
          : getUser(login as string);

        const getUserRepositoriesPromise = getUserRepositories(login as string);

        const [user, repositories] = await Promise.all([
          getUserPromise,
          getUserRepositoriesPromise,
        ]);

        if (!selectedUser) {
          setSelectedUser(user);
        }

        // set the repositories
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return <div></div>;
};
