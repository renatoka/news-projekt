import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Unauthorized/Dashboard/Dashboard';
import { SingleArticle } from './components/Article';
import { ArticlesPanel } from './pages/Authorized/Admins/Panels/Articles/ArticlesPanel';
import { UsersPanel } from './pages/Authorized/Admins/Panels/Users/UsersPanel';
import { UserProfile } from './pages/Authorized/Admins/Others/User/UserProfile';
import { CommentsPanel } from './pages/Authorized/Admins/Panels/Comments/CommentsPanel';
import { Suspense } from 'react';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';

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
    <Suspense fallback={<div>Loading...</div>}>
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
