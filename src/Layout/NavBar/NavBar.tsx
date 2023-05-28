import { HiArrowSmallRight } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import { useSelectedUser } from '../../shared';

export const NavBar = () => {
  const [selectedUser] = useSelectedUser();

  return (
    <nav className="h-16 flex gap-2 items-center p-3">
      <NavLink
        className="cursor-default flex text-lg  hover:text-blue-950  "
        to="/"
      >
        {({ isActive }) => {
          return (
            <span
              className={` pl-3 ${
                isActive ? ' text-white' : 'cursor-pointer text-blue-400'
              }`}
            >
              User
            </span>
          );
        }}
      </NavLink>

      {!!selectedUser && (
        <>
          <HiArrowSmallRight className="text-white " />
          <span className=" text-white flex gap-2">{selectedUser.login}</span>
        </>
      )}
    </nav>
  );
};
