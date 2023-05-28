import { useEffect, useMemo, useState } from 'react';
import { getUsers, UserMeta } from '../../shared';
import debounce from 'lodash/debounce';
import { NavLink } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

export const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<UserMeta[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(() => {
    const filter = searchParams.get('_');

    return filter ?? '';
  });

  const loadData = useMemo(
    () =>
      /**
       * we debounce this to avoid too many calls when the filter change
       */
      debounce(async (params: { page: number; filter: string }) => {
        try {
          setIsLoading(true);

          const { items, total_count } = await getUsers(params);

          setUsers((current) => [...current, ...items]);
          setTotal(total_count);
        } finally {
          setIsLoading(false);
        }
      }, 500),
    []
  );

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
    if (isLoading || total === null) return;

    const handleScroll = debounce(() => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      const isBottomReached = scrollTop + clientHeight >= scrollHeight - 10;
      const shouldLoadMore = total > users.length;

      if (!isBottomReached || !shouldLoadMore) return;

      setPage((prevPage) => prevPage + 1);
    }, 100);

    globalThis.addEventListener('scroll', handleScroll);

    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, total, users.length]);

  return (
    <div className="animate-fadeIn p-4 flex flex-col gap-6">
      <div className=" relative mb-3 flex gap-3">
        <FiSearch className=" text-gray-300 absolute left-48 bottom-3" />

        <input
          data-testid="filter-input"
          className="bg-slate-50 rounded-md p-2 pr-10 border"
          placeholder="Search..."
          value={filter}
          onChange={(event) => {
            const { value } = event.target;

            setFilter(value);
            setSearchParams({ _: value });
          }}
        />

        {!!filter && (
          <button
            onClick={() => {
              setFilter('');
              setSearchParams({ _: '' });
            }}
            className="cursor-pointer text-xs text-blue-400 flex items-center gap-1"
          >
            <AiOutlineClose /> Clean
          </button>
        )}
      </div>

      <ul className=" grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {!!filter &&
          users.map((user) => {
            const { id, login, avatar_url } = user;

            return (
              <li
                className=" rounded-md gap-3 items-center p-3 text-white h-20 flex border border-gray-200 "
                key={id}
              >
                <img
                  className=" h-14 w-14 rounded-full"
                  src={avatar_url}
                  alt="Avatar of the user"
                />
                <NavLink
                  className=" text-blue-900"
                  to={`/repositories/${login}`}
                >
                  {login}
                </NavLink>
              </li>
            );
          })}

        {!filter && (
          <p data-testid="add-filter-placeholder" className=" text-gray-400">
            Please add the filter
          </p>
        )}

        {total === 0 && (
          <li>
            <p className="text-gray-400">
              The is not result for the current filter
            </p>
          </li>
        )}
      </ul>

      {isLoading && (
        <div data-testid="is-loading" className="flex justify-center my-6">
          <div className="w-10 h-10 border-gray-300 border-4 border-t-transparent rounded-full animate-spin border-dashed"></div>
        </div>
      )}
    </div>
  );
};
