import API_URL from './API';
import { io } from 'socket.io-client';

import { useEffect } from 'react';
import { sortByStatusIcon, statusIcons } from './helpers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BoldToastMessage from './components/BoldToastMessage';

// Establish Socket.IO connection
export const socket = io(API_URL);

// Manage events emitted by the server (Home page)
export const useEventsHomePage = (setAllUsersFiltered, setUser, user) => {
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

    // Show new message toast with message icon if the message recipient is the logged in user
    const showNewMessageToast = (toId, senderUsername) => {
      if (toId === user.user_id) {
        toast(
          <BoldToastMessage bold={senderUsername} text={'messaged you!'} />,
          {
            icon: <img className="toast-icon" src={statusIcons.message} />,
          },
        );
      }
    };

    socket.on('update status icon', updateStatusIcon);
    socket.on('update username/text status', updateUsernameOrTextStatus);
    socket.on('show new message toast', showNewMessageToast);

    return () => {
      socket.off('update status icon', updateStatusIcon);
      socket.off('update username/text status', updateUsernameOrTextStatus);
      socket.off('show new message toast', showNewMessageToast);
    };
  }, []);
};

// Manage events emitted by the server (Chat page)
export const useEventsChatPage = (
  user,
  recipient,
  setRecipient,
  setMessages,
  setSomeoneIsTyping,
  setTypingUsername,
) => {
  useEffect(() => {
    // Update messages if the sender matches the recipient on the client side and the recipient matches the logged in user on the client side
    const receiveMessage = (fromId, toId, message) => {
      if (fromId === recipient.user_id && toId === user.user_id) {
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

    // Show/hide is typing indicator if the sender matches the recipient on the client side and the recipient matches the logged in user on the client side
    const showHideIsTypingDM = (fromId, toId, username, isTyping) => {
      if (fromId === recipient.user_id && toId === user.user_id) {
        setSomeoneIsTyping(isTyping);
        setTypingUsername(username);
      }
    };

    socket.on('receive message', receiveMessage);
    socket.on('update username/text status', updateUsernameOrTextStatus);
    socket.on('show/hide isTyping (DM)', showHideIsTypingDM);

    return () => {
      socket.off('receive message', receiveMessage);
      socket.off('update username/text status', updateUsernameOrTextStatus);
      socket.off('show/hide isTyping (DM)', showHideIsTypingDM);
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
export const useEventsGroupChatPage = (
  groupChat,
  setMessages,
  setSomeoneIsTyping,
  setTypingUsername,
) => {
  const navigate = useNavigate();

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

    const removeGroupChat = (deletedGroupChat) => {
      if (deletedGroupChat._id === groupChat._id) {
        navigate('/home/group-chats');
      }
    };

    const showHideIsTypingGroupChat = (groupChatId, username, isTyping) => {
      if (groupChatId === groupChat._id) {
        setSomeoneIsTyping(isTyping);
        setTypingUsername(username);
      }
    };

    socket.on('receive group chat message', receiveGroupChatMessage);
    socket.on('update username/text status', updateUsernameInMessages);
    socket.on('remove group chat', removeGroupChat);
    socket.on('show/hide isTyping (group chat)', showHideIsTypingGroupChat);

    return () => {
      socket.off('receive group chat message', receiveGroupChatMessage);
      socket.off('update username/text status', updateUsernameInMessages);
      socket.off('remove group chat', removeGroupChat);
      socket.off('show/hide isTyping (group chat)', showHideIsTypingGroupChat);
    };
  }, []);
};
