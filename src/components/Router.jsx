import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';

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
          path: '/',
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
