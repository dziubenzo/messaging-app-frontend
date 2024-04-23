import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import AllUsersTab from '../pages/AllUsersTab';
import ContactsTab from '../pages/ContactsTab';
import GroupChatsTab from '../pages/GroupChatsTab';
import OptionsTab from '../pages/OptionsTab';
import LoadingPage from '../pages/LoadingPage';
import ChatPage from '../pages/ChatPage';
import GroupChatPage from '../pages/GroupChatPage';

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
          path: '',
          element: <LoadingPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: 'home',
          element: <HomePage />,
          children: [
            {
              path: '',
              element: <AllUsersTab />,
            },
            {
              path: 'contacts',
              element: <ContactsTab />,
            },
            {
              path: 'group-chats',
              element: <GroupChatsTab />,
            },
            {
              path: 'options',
              element: <OptionsTab />,
            },
          ],
        },
        {
          path: '/chats/:userId',
          element: <ChatPage />,
        },
        {
          path: '/group-chats/:groupChatName',
          element: <GroupChatPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
