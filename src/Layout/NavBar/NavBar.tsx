import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className=" h-24 flex gap-5 ml-4 items-center">
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
      <span className=" text-white">{'=> Victoria Sulyma'}</span>
    </nav>
  );
};
