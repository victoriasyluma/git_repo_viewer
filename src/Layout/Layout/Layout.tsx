import { NavBar } from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className=" mb-8 font-default sticky bg-purple-4">
        <NavBar />
      </header>

      <main className="font-default ">
        <Outlet />
      </main>
    </>
  );
};
