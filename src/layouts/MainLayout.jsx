import { Outlet } from '@tanstack/react-router';

const MainLayout = () => {
  return (
    <div>
      <header>Main Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Main Footer</footer>
    </div>
  );
};

export default MainLayout;