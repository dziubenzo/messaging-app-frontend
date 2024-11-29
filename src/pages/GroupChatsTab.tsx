import { useOutletContext } from 'react-router-dom';
import { useImmer } from 'use-immer';
import GroupChat from '../components/GroupChat';
import { useUser } from '../helpers';
import { useEventsGroupChatsTab } from '../socket';
import type { OutletContext } from '../types';

function GroupChatsTab() {
  const { user } = useOutletContext<OutletContext>();

  const { groupChats: fetchedGroupChats } = useUser();
  const [groupChats, setGroupChats] = useImmer<GroupChat[]>(fetchedGroupChats!);

  // Manage events emitted by the server
  useEventsGroupChatsTab(user, setGroupChats);

  return (
    <>
      {groupChats.map((groupChat) => {
        return (
          <GroupChat
            key={groupChat._id}
            groupChat={groupChat}
            setGroupChats={setGroupChats}
          />
        );
      })}
    </>
  );
}

export default GroupChatsTab;
