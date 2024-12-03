import { useOutletContext } from 'react-router-dom';
import GroupChat from '../components/GroupChat';
import { useEventsGroupChatsTab } from '../socket';
import type { OutletContext } from '../types';

function GroupChatsTab() {
  const { user, groupChats, setGroupChats } = useOutletContext<OutletContext>();

  // Manage events emitted by the server
  useEventsGroupChatsTab(user, setGroupChats);

  return (
    <>
      {groupChats.map((groupChat) => {
        return (
          <GroupChat
            key={groupChat._id}
            groupChat={groupChat}
          />
        );
      })}
    </>
  );
}

export default GroupChatsTab;
