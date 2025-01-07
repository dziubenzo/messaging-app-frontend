import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import {
  chatPageLoader,
  groupChatPageLoader,
  homePageLoader,
} from '../loaders';
import AllUsersTab from '../pages/AllUsersTab';
import ChatPage from '../pages/ChatPage';
import ContactsTab from '../pages/ContactsTab';
import ErrorPage from '../pages/ErrorPage';
import GroupChatPage from '../pages/GroupChatPage';
import GroupChatsTab from '../pages/GroupChatsTab';
import HomePage from '../pages/HomePage';
import LoadingPage from '../pages/LoadingPage';
import LoginPage from '../pages/LoginPage';
import NewGroupChatTab from '../pages/NewGroupChatTab';
import OptionsTab from '../pages/OptionsTab';
import RegisterPage from '../pages/RegisterPage';
import SkeletonPage from '../pages/SkeletonPage';
import SuspenseWrapper from '../pages/SuspenseWrapper';
import App from './App';

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
          index: true,
          element: <Navigate replace to="/home" />,
        },
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
          element: (
            <SuspenseWrapper
              fallback={<SkeletonPage type={'home'} />}
              isHomePage
            >
              <HomePage />
            </SuspenseWrapper>
          ),
          loader: homePageLoader,
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
              path: 'group-chats/new',
              element: <NewGroupChatTab />,
            },
            {
              path: 'options',
              element: <OptionsTab />,
            },
          ],
        },
        {
          path: '/chats/:userId',
          element: (
            <SuspenseWrapper
              fallback={<SkeletonPage type={'chat'} />}
              isChatPage
            >
              <ChatPage />
            </SuspenseWrapper>
          ),
          loader: chatPageLoader,
        },
        {
          path: '/group-chats/:groupChatName',
          element: (
            <SuspenseWrapper
              fallback={<SkeletonPage type={'chat'} />}
              isGroupChatPage
            >
              <GroupChatPage />
            </SuspenseWrapper>
          ),
          loader: groupChatPageLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
