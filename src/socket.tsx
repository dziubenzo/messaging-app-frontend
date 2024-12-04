import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import type { Updater } from 'use-immer';
import API_URL from './API';
import BoldToastMessage from './components/BoldToastMessage';
import { STATUS_ICONS } from './constants';
import { sortByStatusIcon } from './helpers';
import type {
  GroupChat,
  GroupChatMessage,
  Message,
  StatusIcon,
  User,
} from './types';

// Establish Socket.IO connection
export const socket = io(API_URL);

// Manage events emitted by the server (Home page)
export const useEventsHomePage = (
  setAllUsersFiltered: Updater<User[]>,
  setUser: Updater<User>,
  user: User,
) => {
  useEffect(() => {
    // Update status icon in both tabs
    // Sort both tabs if justified to do so
    const updateStatusIcon = (
      userId: User['user_id'],
      imageURL: StatusIcon,
    ) => {
      setAllUsersFiltered((draft) => {
        const user = draft.find((user) => user.user_id === userId);
        if (user) {
          user.status_icon = imageURL;
          draft.sort(sortByStatusIcon);
        }
      });
      setUser((draft) => {
        if (!draft) return;
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
    const updateUsernameOrTextStatus = (
      userId: User['user_id'],
      username: User['username'],
      textStatus: User['status_text'],
    ) => {
      setAllUsersFiltered((draft) => {
        const user = draft.find((user) => user.user_id === userId);
        if (user) {
          if (user.username !== username) {
            user.username = username;
            draft.sort(sortByStatusIcon);
          }
          user.status_text = textStatus;
        }
      });
      setUser((draft) => {
        if (!draft) return;
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
    const showNewMessageToast = (
      toId: User['user_id'],
      senderUsername: User['username'],
    ) => {
      if (toId === user.user_id) {
        toast(
          <BoldToastMessage bold={senderUsername} text={'messaged you!'} />,
          {
            icon: <img className="toast-icon" src={STATUS_ICONS.message} />,
          },
        );
      }
    };

    // Show toast when a new user registers
    const showNewUserToast = (username: User['username']) => {
      toast.info(
        <BoldToastMessage bold={username} text={'just registered!'} />,
      );
    };

    socket.on('update status icon', updateStatusIcon);
    socket.on('update username/text status', updateUsernameOrTextStatus);
    socket.on('show new message toast', showNewMessageToast);
    socket.on('show new user toast', showNewUserToast);

    return () => {
      socket.off('update status icon', updateStatusIcon);
      socket.off('update username/text status', updateUsernameOrTextStatus);
      socket.off('show new message toast', showNewMessageToast);
      socket.off('show new user toast', showNewUserToast);
    };
  }, []);
};

// Manage events emitted by the server (Chat page)
export const useEventsChatPage = (
  user: User,
  recipient: User,
  setRecipient: Updater<User>,
  setMessages: Updater<Message[]>,
  setSomeoneIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
  setTypingUsername: React.Dispatch<React.SetStateAction<User['username']>>,
) => {
  useEffect(() => {
    // Update messages if the sender matches the recipient on the client side and the recipient matches the logged in user on the client side
    const receiveMessage = (
      fromId: User['user_id'],
      toId: User['user_id'],
      message: Message,
    ) => {
      if (fromId === recipient.user_id && toId === user.user_id) {
        setMessages((draft) => {
          draft.push(message);
        });
      }
    };

    // Update username and text status in the top bar and username in chat messages if the sender matches the recipient
    const updateUsernameOrTextStatus = (
      senderId: User['user_id'],
      username: User['username'],
      textStatus: User['status_text'],
    ) => {
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
    const showHideIsTypingDM = (
      fromId: User['user_id'],
      toId: User['user_id'],
      username: User['username'],
      isTyping: boolean,
    ) => {
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
export const useEventsGroupChatsTab = (
  user: User,
  setGroupChats: Updater<GroupChat[]>,
) => {
  useEffect(() => {
    const removeGroupChat = (deletedGroupChat: GroupChat) => {
      setGroupChats((draft) => {
        return draft.filter(
          (groupChat) => groupChat._id !== deletedGroupChat._id,
        );
      });
    };

    const updateUsername = (
      userId: User['user_id'],
      username: User['username'],
    ) => {
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

    const addGroupChat = (
      newGroupChatMembers: User['_id'][],
      newGroupChat: GroupChat,
    ) => {
      if (newGroupChatMembers.includes(user._id)) {
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
  groupChat: GroupChat,
  setMessages: Updater<GroupChatMessage[]>,
  setSomeoneIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
  setTypingUsername: React.Dispatch<React.SetStateAction<string>>,
) => {
  const navigate = useNavigate();

  useEffect(() => {
    const receiveGroupChatMessage = (
      groupChatId: GroupChat['_id'],
      message: GroupChatMessage,
    ) => {
      if (groupChatId === groupChat._id) {
        setMessages((draft) => {
          draft.push(message);
        });
      }
    };
    const updateUsernameInMessages = (
      senderId: User['user_id'],
      username: User['username'],
    ) => {
      setMessages((draft) => {
        draft.map((message) => {
          if (message.sender.user_id === senderId) {
            message.sender.username = username;
          }
        });
      });
    };

    const removeGroupChat = (deletedGroupChat: GroupChat) => {
      if (deletedGroupChat._id === groupChat._id) {
        navigate('/home/group-chats');
      }
    };

    const showHideIsTypingGroupChat = (
      groupChatId: GroupChat['_id'],
      username: User['username'],
      isTyping: boolean,
    ) => {
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
