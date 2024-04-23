import API_URL from './API';
import { io } from 'socket.io-client';

import { useEffect } from 'react';
import { sortByStatusIcon } from './helpers';

// Establish Socket.IO connection
export const socket = io(API_URL);

// Manage events emitted by the server (Home page)
export const useEventsHomePage = (setAllUsersFiltered, setUser) => {
  useEffect(() => {
    // Update status icon in both tabs
    // Sort both tabs if justified to do so
    const updateStatusIcon = (userId, imageURL) => {
      setAllUsersFiltered((draft) => {
        const user = draft.find((user) => user.user_id === userId);
        user.status_icon = imageURL;
        draft.sort(sortByStatusIcon);
      });
      setUser((draft) => {
        const user = draft.contacts.find(
          (contact) => contact.user_id === userId,
        );
        if (user) {
          user.status_icon = imageURL;
          draft.contacts.sort(sortByStatusIcon);
        }
      });
    };

    // Update username and text status in both tabs
    // Sort both tabs if justified to do so
    const updateUsernameOrTextStatus = (userId, username, textStatus) => {
      setAllUsersFiltered((draft) => {
        const user = draft.find((user) => user.user_id === userId);
        if (user.username !== username) {
          user.username = username;
          draft.sort(sortByStatusIcon);
        }
        user.status_text = textStatus;
      });
      setUser((draft) => {
        const user = draft.contacts.find(
          (contact) => contact.user_id === userId,
        );
        if (user) {
          if (user.username !== username) {
            user.username = username;
            draft.contacts.sort(sortByStatusIcon);
          }
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
export const useEventsGroupChatsTab = (user, setGroupChats) => {
  useEffect(() => {
    const removeGroupChat = (deletedGroupChat) => {
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

    const addGroupChat = (members, newGroupChat) => {
      if (members.includes(user._id)) {
        setGroupChats((draft) => {
          draft.push(newGroupChat);
        });
      }
    };

    socket.on('remove group chat', removeGroupChat);
    socket.on('update username/text status', updateUsername);
    socket.on('add group chat', addGroupChat);

    return () => {
      socket.off('remove group chat', removeGroupChat);
      socket.off('update username/text status', updateUsername);
      socket.off('add group chat', addGroupChat);
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
    const updateUsernameInMessages = (senderId, username) => {
      setMessages((draft) => {
        draft.map((message) => {
          if (message.sender.user_id === senderId) {
            message.sender.username = username;
          }
        });
      });
    };

    socket.on('receive group chat message', receiveGroupChatMessage);
    socket.on('update username/text status', updateUsernameInMessages);

    return () => {
      socket.off('receive group chat message', receiveGroupChatMessage);
      socket.off('update username/text status', updateUsernameInMessages);
    };
  }, []);
};
