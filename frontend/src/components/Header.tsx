import { Link } from 'react-router-dom';

export const Header = () => {
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
          <Link to="/login" className="flex-shrink-0 ml-5">
            <div className="w-[24px] h-full">
              <svg className="cursor-pointer" viewBox="0 0 20 20">
                <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
