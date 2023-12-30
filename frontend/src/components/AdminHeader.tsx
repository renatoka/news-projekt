import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { logoutAccount } from '../redux/actions/auth.actions';

export const AdminHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const news_categories = [
    {
      id: 1,
      name: 'Articles',
      path: 'articles',
      color: '#f5a528',
      authorizedRoles: ['admin', 'editor'],
    },
    {
      id: 2,
      name: 'Comments',
      path: 'comments',
      color: '#40b14d',
      authorizedRoles: ['admin', 'editor'],
    },
    {
      id: 3,
      name: 'Users',
      path: 'users',
      color: '#3b82f6',
      authorizedRoles: ['admin'],
    },
  ];

  const { user } = useAppSelector((state) => state.loggedUser);

  const handleLogout = async () => {
    dispatch(logoutAccount()).then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="container mx-auto pb-5">
      <div className="flex flex-col w-full justify-between items-center overflow-y-scroll">
        <div className="flex flex-row w-full justify-between items-center pb-2">
          <Link to="/articles">
            <img
              src="https://cdn.worldvectorlogo.com/logos/news-pro.svg"
              alt="News Pro"
              className="w-[24px] h-[24px]"
            />
          </Link>
          <div className="flex gap-5 items-center">
            {news_categories.map(
              (link: any, index: number) =>
                link.authorizedRoles.includes(user.role_name) && (
                  <Link
                    to={`/${link.path}`}
                    key={index}
                    className="text-base md:text-lg font-bold uppercase p-2 cursor-pointer"
                    style={{
                      borderBottom: `2px solid ${link.color}`,
                    }}
                  >
                    {link.name}
                  </Link>
                ),
            )}
            {user.id && (
              <Dropdown className="mt-3" placement="bottom-end" size="sm">
                <DropdownTrigger>
                  <Avatar
                    src={user.avatar_image}
                    size="sm"
                    className="cursor-pointer flex-shrink-0 mt-2 mr-2"
                    isBordered
                  />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
