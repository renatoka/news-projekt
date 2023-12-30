import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { logoutAccount } from '../redux/actions/auth.actions';
export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const news_categories = [
    {
      id: 1,
      name: 'General',
      path: '/general',
      color: '#f5a528',
    },
    {
      id: 2,
      name: 'Business',
      path: '/business',
      color: '#40b14d',
    },
    {
      id: 3,
      name: 'Technology',
      path: '/technology',
      color: '#efc10d',
    },
    {
      id: 4,
      name: 'Science',
      path: '/science',
      color: '#47c0ff',
    },
    {
      id: 5,
      name: 'Health',
      path: '/health',
      color: '#297af6',
    },
    {
      id: 6,
      name: 'Politics',
      path: '/politics',
      color: '#9757f6',
    },
    {
      id: 7,
      name: 'Sports',
      path: '/sports',
      color: '#d22328',
    },
  ];

  const { user } = useAppSelector((state) => state.loggedUser);

  const handleLogout = async () => {
    await dispatch(logoutAccount()).then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="container mx-auto pb-5">
      <div className="flex flex-col w-full justify-between items-center overflow-y-scroll">
        <div className="flex flex-row w-full justify-between items-center pb-2">
          <Link to="/" className="flex-shrink-0 mr-5">
            <img
              src="https://cdn.worldvectorlogo.com/logos/news-pro.svg"
              alt="News Pro"
              className="w-[24px] h-full"
            />
          </Link>
          {news_categories.map((link: any, index: number) => (
            <div
              key={index}
              className="text-base md:text-lg font-bold uppercase p-2 cursor-pointer"
              style={{
                borderBottom: `2px solid ${link.color}`,
              }}
            >
              <a href={link.path}>{link.name}</a>
            </div>
          ))}
          {user.id ? (
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
          ) : (
            <Link
              to="/login"
              style={{
                borderBottom: `2px solid #a5a528`,
              }}
            >
              <div className="text-base md:text-lg font-bold uppercase p-2 cursor-pointer">
                Login
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
