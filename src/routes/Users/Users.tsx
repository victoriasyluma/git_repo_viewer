import { useEffect, useState } from 'react';
import { getUsers, User } from '../../shared';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const { items, total_count } = await getUsers({
          filter: 'victoriasy',
          page,
        });

        setUsers([...users, ...items]);
        setTotal(total_count);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

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
    <div className="animate-fadeIn">
      <p className=" text-3xl">Welcome to the Home page</p>
      <ul>
        {users.map((user) => {
          return (
            <li className="" key={user.id}>
              {user.login}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
