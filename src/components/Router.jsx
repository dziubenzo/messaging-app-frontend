import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: (
        <App>
          <ErrorPage />
        </App>
      ),
      children: [
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          path: '/home',
          element: <HomePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
