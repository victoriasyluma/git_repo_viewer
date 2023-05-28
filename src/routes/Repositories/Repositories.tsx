import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { useParams } from 'react-router-dom';
import {
  getUserRepositories,
  getUser,
  useSelectedUser,
  Repository,
} from '../../shared';
import { isNil } from 'react-global-state-hooks';
import { HiOutlineStar } from 'react-icons/hi2';
import { BiGitRepoForked } from 'react-icons/bi';
import { getShortDateFormat } from '../../shared/utils';

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

    return () => {
      setSelectedUser(null);
    };
  }, []);

  const loadData = useMemo(
    () => async (params: { page: number }) => {
      try {
        setIsLoading(true);

        const repositories = await getUserRepositories({
          ...params,
          login,
        });

        setRepositories((current) => [...current, ...repositories]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadData({ page });
  }, [page]);

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
    <div className="animate-fadeIn p-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {repositories.map((repo) => {
          return (
            <li
              className=" rounded-md gap-3 p-3 flex flex-col border border-gray-200"
              key={repo.id}
            >
              <a href={repo.svn_url}>
                <h2 className="text-blue-400 text-lg hover:underline focus:underline">
                  {repo.name}
                </h2>
              </a>

              <p className=" font-thin">{repo.description}</p>

              <ul className="flex gap-3">
                {!!repo.language && <li className="">{repo.language}</li>}

                {!!repo.watchers && (
                  <li className="flex items-center gap-1">
                    <HiOutlineStar />
                    {repo.watchers}
                  </li>
                )}

                {!!repo.forks_count && (
                  <li className="flex items-center gap-1">
                    <BiGitRepoForked />
                    {repo.forks_count}
                  </li>
                )}

                <li className="">{getShortDateFormat(repo.updated_at)}</li>
              </ul>
            </li>
          );
        })}
      </ul>

      {isLoading && (
        <div className="flex justify-center my-6">
          <div className="w-10 h-10 border-gray-300 border-4 border-t-transparent rounded-full animate-spin border-dashed"></div>
        </div>
      )}
    </div>
  );
};
