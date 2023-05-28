import { HiArrowSmallRight } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import { useSelectedUser } from '../../shared';

export const NavBar = () => {
  const [selectedUser] = useSelectedUser();

  return (
    <nav className="h-16 flex gap-2 items-center">
      <NavLink className="flex text-lg  hover:text-blue-950  " to="/">
        {({ isActive }) => {
          return (
            <span
              className={` pl-3 ${isActive ? ' text-blue-400' : ' text-white'}`}
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
