import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { SingleArticle } from './components/Article';
import { ArticlesPanel } from './pages/Admins/Articles/ArticlesPanel';
import { UsersPanel } from './pages/Admins/Users/UsersPanel';
import { UserProfile } from './pages/Admins/User/UserProfile';
import { CommentsPanel } from './pages/Admins/Comments/CommentsPanel';

function App() {
  const news_categories = [
    {
      id: 1,
      name: 'General',
      path: '/general',
    },
    {
      id: 2,
      name: 'Business',
      path: '/business',
    },
    {
      id: 3,
      name: 'Technology',
      path: '/technology',
    },
    {
      id: 4,
      name: 'Science',
      path: '/science',
    },
    {
      id: 5,
      name: 'Health',
      path: '/health',
    },
    {
      id: 6,
      name: 'Politics',
      path: '/politics',
    },
    {
      id: 7,
      name: 'Sports',
      path: '/sports',
    },
    {
      id: 8,
      name: '/',
      path: '/',
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/:category/:slug/:id" element={<SingleArticle />} />
          {news_categories.map((category) => (
            <Route
              key={category.id}
              path={category.path}
              element={<Dashboard />}
            />
          ))}
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="articles" element={<ArticlesPanel />} />
          <Route path="comments" element={<CommentsPanel />} />
          <Route path="users" element={<UsersPanel />} />
          <Route path="user/:id" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
