import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useImmer } from 'use-immer';
import Error from '../components/Error';
import GroupChat from '../components/GroupChat';
import Loading from '../components/Loading';
import { useFetch } from '../helpers';
import { useEventsGroupChatsTab } from '../socket';
import type { OutletContext } from '../types';

function GroupChatsTab() {
  const { user } = useOutletContext<OutletContext>();
  const { data, loading, error } = useFetch<GroupChat[]>(
    `/group-chats/?member=${user._id}`,
  );

  const [groupChats, setGroupChats] = useImmer<GroupChat[]>([]);

  // Set state once group chats are fetched
  useEffect(() => {
    if (data) {
      setGroupChats(data);
    }
  }, [data]);

  // Manage events emitted by the server
  useEventsGroupChatsTab(user, setGroupChats);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

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
