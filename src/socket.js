import API_URL from './API';
import { io } from 'socket.io-client';

import { useEffect } from 'react';

// Establish Socket.IO connection
export const socket = io(API_URL);

// Manage events emitted by the server (Home page)
export const useEventsHomePage = (setAllUsersFiltered, setUser) => {
  useEffect(() => {
    // Update status icon in both tabs
    const updateStatusIcon = (userId, imageURL) => {
      setAllUsersFiltered((draft) => {
        const user = draft.find((user) => user.user_id === userId);
        user.status_icon = imageURL;
      });
      setUser((draft) => {
        const user = draft.contacts.find(
          (contact) => contact.user_id === userId,
        );
        if (user) {
          user.status_icon = imageURL;
        }
      });
    };

    // Update username and text status in both tabs
    const updateUsernameOrTextStatus = (userId, username, textStatus) => {
      setAllUsersFiltered((draft) => {
        const user = draft.find((user) => user.user_id === userId);
        user.username = username;
        user.status_text = textStatus;
      });
      setUser((draft) => {
        const user = draft.contacts.find(
          (contact) => contact.user_id === userId,
        );
        if (user) {
          user.username = username;
          user.status_text = textStatus;
        }
      });
    };

    socket.on('update status icon', updateStatusIcon);
    socket.on('update username/text status', updateUsernameOrTextStatus);

    return () => {
      socket.off('update status icon', updateStatusIcon);
      socket.off('update username/text status', updateUsernameOrTextStatus);
    };
  }, []);
};

// Manage events emitted by the server (Chat page)
export const useEventsChatPage = (recipient, setRecipient, setMessages) => {
  useEffect(() => {
    // Update messages if its sender is the recipient
    const receiveMessage = (senderId, message) => {
      if (senderId === recipient.user_id) {
        setMessages((draft) => {
          draft.push(message);
        });
      }
    };

    // Update username and text status in the top bar if the sender matches the recipient
    const updateUsernameOrTextStatus = (senderId, username, textStatus) => {
      if (senderId === recipient.user_id) {
        setRecipient((draft) => {
          draft.username = username;
          draft.status_text = textStatus;
        });
      }
    };

    socket.on('receive message', receiveMessage);
    socket.on('update username/text status', updateUsernameOrTextStatus);

    return () => {
      socket.off('receive message', receiveMessage);
      socket.off('update username/text status', updateUsernameOrTextStatus);
    };
  }, []);
};
