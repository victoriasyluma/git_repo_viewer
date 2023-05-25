import { NavBar } from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className="font-default sticky">
        <NavBar />
      </header>

      <main className="font-default ">
        <Outlet />
      </main>
    </>
  );
};
