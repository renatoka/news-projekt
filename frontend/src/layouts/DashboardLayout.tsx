import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { useEffect } from 'react';

export const DashboardLayout = () => {
  const location = useLocation();

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    if (location.pathname == '/') {
      document.title = `News App`;
    } else {
      document.title = `News App | ${capitalize(
        location.pathname.replace('/', ''),
      )}`;
    }
  }, [location]);

  return (
    <div className="container mx-auto px-5">
      <Header />
      <Outlet />
    </div>
  );
};
