/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import UserChatItem from './UserChatItem';
import { showSidebar } from '@/store/slices/global';
import { useGetAllChatRoomsQuery, useReadAllMessagesOnAChatRoomMutation } from '@/services/portalHomeApi';
import { useAppSelector } from '@/store/hooks';
import { setIdRoom, setNamePartnerChat, setReceiverId } from '@/store/slices/chatSlice';
import Logo from '@/components/Logo';
import { chatRoomResponse } from '@/types/chatType';

const SidebarChat = () => {
  const userId = useAppSelector(state => state.user.idAccount);
  const { idRoom } = useAppSelector(state => state.chat);
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const size = 15;
  const [userChat, setUserChat] = useState([]);
  const scrollContainerRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const { data, refetch, isSuccess } = useGetAllChatRoomsQuery(
    { userId, keyword, page, size },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [readMessage] = useReadAllMessagesOnAChatRoomMutation();
  const previousDataRef = useRef<chatRoomResponse>();
  useEffect(() => {
    if (data && isSuccess && previousDataRef.current !== data) {
      if (data?.data?.content.length === 0) {
        setHasMore(false);
        return;
      }
      previousDataRef.current = data;
      setUserChat(prevChats => [...prevChats, ...data.data.content]);
    }
  }, [data, isSuccess, page, userChat.length]);

  const handleScroll = useCallback(
    throttle(() => {
      const scrollContainer = scrollContainerRef.current;
      const scrollHeight = scrollContainer.scrollHeight;
      const scrollTop = scrollContainer.scrollTop;
      const clientHeight = scrollContainer.clientHeight;
      if (!hasMore) {
        return;
      }
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setPage(prevPage => prevPage + 1);
      }
    }, 500),
    [hasMore]
  );

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      handleScroll.cancel();
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  //-------------------------- Socket --------------------------
  useEffect(() => {
    const connectToWebSocket = () => {
      const client = new Client({
        webSocketFactory: () => new SockJS('http://192.168.0.152:8082/ws/stomp'),
        onConnect: () => {
          client.subscribe(`/topic/new-chatroom`, () => {
            refetch();
          });
          client.subscribe(`/topic/chatroom/${idRoom}`, () => {
            readMessage({ chatRoomId: idRoom });
          });
        },
        onStompError: frame => {
          console.error('STOMP Error:', frame.headers['message']);
          console.error('Details:', frame.body);
        },
      });

      client.activate();
      return client;
    };
    const client = connectToWebSocket();

    return () => {
      if (client) client.deactivate();
    };
  }, [refetch]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className=" border-b border-solid bg-white px-0 py-4 sm:px-5">
        <Logo />
        <div className="mt-5 flex items-center rounded-[20px] border border-[#DBDADE] px-[14px]">
          <SearchIcon className="text-[#4B465C]" />
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="w-[90%] border-none placeholder:text-[15px] placeholder:text-[#4B465C]"
            placeholder="Tìm kiếm đoạn chat..."
          />
        </div>
      </div>
      <div ref={scrollContainerRef} className="max-h-screen overflow-y-auto px-0 sm:px-3">
        <p className="px-1 py-[10px] text-lg font-medium text-[#246AA3] sm:px-4">Trò chuyện</p>
        <ul className="flex flex-col gap-1">
          {userChat.length > 0 ? (
            userChat.map(user => (
              <UserChatItem
                fullName={user?.member.id !== userId ? user?.memberName : user?.ownerName}
                id={user?.id}
                key={user?.id}
                onClick={() => {
                  dispatch(setIdRoom(user.id));
                  dispatch(setNamePartnerChat(user?.member.id !== userId ? user?.memberName : user?.ownerName));
                  dispatch(setReceiverId(user?.member.id !== userId ? user?.member.id : user?.owner.id));
                  readMessage({ chatRoomId: user?.id });
                }}
                lastMessage={user?.member.id !== userId ? 'Sent: ' + user?.lastMessage?.content : user?.lastMessage.content}
                time={dayjs(user?.lastMessage?.createAt).format('HH:mm')}
                isRead={user?.lastMessage?.isRead}
              />
            ))
          ) : (
            <div className="mt-3 flex flex-col items-center gap-1">
              <p className="text-[15px] font-bold">Không tìm thấy kết quả</p>
              <p className="text-[15px] opacity-80">vui lòng tìm từ khóa khác</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

const ChatLeft = () => {
  const theme = useTheme();
  const isMobileAndTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isShowSidebar = useSelector((store: any) => store.global.showSidebar);
  const dispatch = useDispatch();
  return isMobileAndTablet ? (
    <Drawer open={isShowSidebar} onClose={() => dispatch(showSidebar())} classes={{ paper: 'w-3/4 max-w-[400px] p-4 flex flex-col gap-6' }}>
      <SidebarChat />
    </Drawer>
  ) : (
    <SidebarChat />
  );
};
export default ChatLeft;
