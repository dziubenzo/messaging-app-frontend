import { useOutletContext } from 'react-router-dom';
import { useFetch } from '../helpers';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import GroupChat from '../components/GroupChat';
import { useEventsGroupChatsTab } from '../socket';
import Loading from '../components/Loading';
import Error from '../components/Error';

function GroupChatsTab() {
  const { user } = useOutletContext();
  const { data, loading, error } = useFetch(`/group-chats/?member=${user._id}`);

  const [groupChats, setGroupChats] = useImmer([]);

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
