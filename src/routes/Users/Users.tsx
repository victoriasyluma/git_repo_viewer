import { useEffect, useMemo, useState } from 'react';
import { getUsers, SearchUser, setSelectedUser } from '../../shared';
import debounce from 'lodash/debounce';
import { NavLink } from 'react-router-dom';

export const Users = () => {
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');

  const loadData = useMemo(
    () =>
      debounce(async (params: { page: number; filter: string }) => {
        try {
          setIsLoading(true);

          const { items, total_count } = await getUsers(params);

          setUsers((current) => [...current, ...items]);
          setTotal(total_count);
        } finally {
          setIsLoading(false);
        }
      }, 3000),
    []
  );

  useEffect(() => {
    setSelectedUser(null);
  }, []);

  useEffect(() => {
    setPage(1);
    setTotal(null);
    setUsers([]);
  }, [filter]);

  useEffect(() => {
    if (!filter) return;

    loadData({ page, filter });
  }, [page, filter]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      const isBottomReached = scrollTop + clientHeight >= scrollHeight - 10;
      const shouldLoadMore = total !== null && total > users.length;

      if (!isBottomReached || isLoading || !shouldLoadMore) return;

      setPage((prevPage) => prevPage + 1);
    };

    globalThis.addEventListener('scroll', handleScroll);

    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, total, users.length]);

  return (
    <div className="animate-fadeIn p-4">
      <input
        placeholder="Search..."
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
      />

      <ul>
        {!!filter &&
          users.map((user) => {
            const { id, login } = user;

            return (
              <li className="" key={id}>
                <NavLink
                  to={`/repositories/${login}`}
                  onClick={() => {
                    setSelectedUser(user);
                  }}
                >
                  {login}
                </NavLink>
              </li>
            );
          })}

        {!filter && <p className=" text-gray-400">Please add the filter</p>}

        {isLoading && (
          <li>
            <div className=" w-10 h-10 border-gray-300 border-4 border-t-transparent rounded-full animate-spin border-dashed"></div>
          </li>
        )}

        {total === 0 && (
          <li>
            <p className="text-gray-400">
              The is not result for the current filter
            </p>
          </li>
        )}
      </ul>
    </div>
  );
};
