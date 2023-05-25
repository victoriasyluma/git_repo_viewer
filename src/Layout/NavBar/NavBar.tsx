import { NavLink } from 'react-router-dom';
import { useSelectedUser } from '../../shared';

export const NavBar = () => {
  const [selectedUser] = useSelectedUser();

  return (
    <nav className="flex gap-2">
      <NavLink className="flex text-lg  hover:text-blue-950  " to="/">
        {({ isActive }) => {
          return (
            <span
              className={` ${isActive ? ' text-blue-400' : ' text-purple-1'}`}
            >
              User
            </span>
          );
        }}
      </NavLink>

      {!!selectedUser && <span className="">{`=> ${selectedUser.login}`}</span>}
    </nav>
  );
};
