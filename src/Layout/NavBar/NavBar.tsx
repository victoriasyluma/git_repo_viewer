import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  // const selectedUser = useSelectedUser();

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
      <span className="">{'=> Victoria Sulyma'}</span>
    </nav>
  );
};
