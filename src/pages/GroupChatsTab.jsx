import { useOutletContext } from 'react-router-dom';
import { useFetch } from '../helpers';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { BarLoader } from 'react-spinners';
import GroupChat from '../components/GroupChat';
import { useEventsGroupChatsTab } from '../socket';
import { BiError } from 'react-icons/bi';

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
  useEventsGroupChatsTab(groupChats, setGroupChats);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <BarLoader color="#ff7f3f" size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-wrapper">
        <BiError />
        <h3>Error</h3>
      </div>
    );
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
