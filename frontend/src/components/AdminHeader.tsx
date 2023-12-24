import { Link } from 'react-router-dom';

export const AdminHeader = () => {
  const news_categories = [
    {
      id: 1,
      name: 'Articles',
      path: 'articles',
      color: '#f5a528',
    },
    {
      id: 2,
      name: 'Comments',
      path: 'comments',
      color: '#40b14d',
    },
    {
      id: 3,
      name: 'Users',
      path: 'users',
      color: '#3b82f6',
    },
  ];

  return (
    <div className="container mx-auto pb-5">
      <div className="flex flex-col w-full justify-between items-center overflow-y-scroll">
        <div className="flex flex-row w-full justify-between items-center pb-2">
          <Link to="/admin/articles">
            <img
              src="https://cdn.worldvectorlogo.com/logos/news-pro.svg"
              alt="News Pro"
              className="w-[24px] h-[24px]"
            />
          </Link>
          <div className="flex gap-5">
            {news_categories.map((link: any, index: number) => (
              <Link
                to={`/admin/${link.path}`}
                key={index}
                className="text-base md:text-lg font-bold uppercase p-2 cursor-pointer"
                style={{
                  borderBottom: `2px solid ${link.color}`,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
