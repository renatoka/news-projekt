import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';

export const AdminLayout = () => {
  return (
    <div className="container mx-auto px-5">
      <AdminHeader />
      <Outlet />
    </div>
  );
};
