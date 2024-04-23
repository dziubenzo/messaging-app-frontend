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

    // Update username and text status in the top bar and username in chat messages if the sender matches the recipient
    const updateUsernameOrTextStatus = (senderId, username, textStatus) => {
      if (senderId === recipient.user_id) {
        setRecipient((draft) => {
          draft.username = username;
          draft.status_text = textStatus;
        });
        setMessages((draft) => {
          draft.map((message) => {
            if (message.sender.user_id === senderId) {
              message.sender.username = username;
            }
          });
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

// Manage events emitted by the server (Group Chats tab)
export const useEventsGroupChatsTab = (setGroupChats) => {
  useEffect(() => {
    const updateGroupChats = (deletedGroupChat) => {
      setGroupChats((draft) => {
        return draft.filter(
          (groupChat) => groupChat._id !== deletedGroupChat._id,
        );
      });
    };

    const updateUsername = (userId, username) => {
      setGroupChats((draft) => {
        for (const groupChat of draft) {
          for (const member of groupChat.members) {
            if (member.user_id === userId) {
              member.username = username;
            }
          }
        }
      });
    };

    socket.on('update group chats', updateGroupChats);
    socket.on('update username/text status', updateUsername);

    return () => {
      socket.off('update group chats', updateGroupChats);
      socket.off('update username/text status', updateUsername);
    };
  }, []);
};

// Manage events emitted by the server (Group Chat page)
export const useEventsGroupChatPage = (groupChat, setMessages) => {
  useEffect(() => {
    const receiveGroupChatMessage = (groupChatId, message) => {
      if (groupChatId === groupChat._id) {
        setMessages((draft) => {
          draft.push(message);
        });
      }
    };
    socket.on('receive group chat message', receiveGroupChatMessage);

    return () => {
      socket.off('receive group chat message', receiveGroupChatMessage);
    };
  }, []);
};
