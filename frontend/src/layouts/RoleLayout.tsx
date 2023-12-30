import { useEffect, useState } from 'react';
import { getTokenData } from '../redux/actions/auth.actions';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';

export const RoleLayout = ({
  authorizedRoles,
}: {
  authorizedRoles: string[];
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        const tokenData = await dispatch(getTokenData(token));
        if (tokenData != null) {
          setUser(tokenData);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (user.role_name) {
      switch (user.role_name) {
        case 'user':
          if (!authorizedRoles.includes('user')) {
            navigate('/');
          }
          break;
        case 'editor':
          if (!authorizedRoles.includes('editor')) {
            navigate('/articles');
          }
          break;
        case 'admin':
          if (!authorizedRoles.includes('admin')) {
            navigate('/articles');
          }
          break;
        default:
          navigate('/');
          break;
      }
    }
  }, [user]);

  return (
    <div>
      <Outlet />
    </div>
  );
};
