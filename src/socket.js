import API_URL from './API';
import { io } from 'socket.io-client';

import { useEffect } from 'react';

// Establish Socket.IO connection
export const socket = io(API_URL);

// Manage events emitted by the server
export const useManageEvents = (setAllUsersFiltered, setUser) => {
  useEffect(() => {
    // Update status icon in both tabs
    socket.on('update status icon', (userId, imageURL) => {
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
    });
    // Update username and text status in both tabs
    socket.on('update username/text status', (userId, username, textStatus) => {
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
    });
  }, []);
};
