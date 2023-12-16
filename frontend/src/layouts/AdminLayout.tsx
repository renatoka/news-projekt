import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';

export const AdminLayout = () => {
  const location = useLocation();

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className="container mx-auto px-5">
      <AdminHeader />
      <Outlet />
    </div>
  );
};
