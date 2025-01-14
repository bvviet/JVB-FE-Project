/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';
import SockJS from 'sockjs-client'; // Import SockJS for WebSocket fallback
import { Client } from '@stomp/stompjs';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { Avatar, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { setLoading, showSidebar } from '@/store/slices/global';
import { useAppSelector } from '@/store/hooks';
import { useGetAllMessagesQuery } from '@/services/portalHomeApi';
import { ChatResponse } from '@/types/chatType';

const { TextArea } = Input;

const ChatRight = () => {
  const [page, setPage] = useState<number>(1);
  const size = 10;
  const [chats, setChats] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState<string>(null);
  const [stompClient, setStompClient] = useState(null);
  const { idRoom, namePartnerChat, receiverId } = useAppSelector(state => state.chat);
  const { id } = useAppSelector(state => state.user);

  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobileAndTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollContainerRef = useRef(null);
  const previousDataRef = useRef<ChatResponse | undefined>(undefined);

  const { data, isSuccess, isLoading, refetch } = useGetAllMessagesQuery(
    { roomId: idRoom, page, size },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    setChats([]);
    setPage(1);
    setHasMore(true);
    previousDataRef.current = undefined;
  }, [idRoom]);

  useEffect(() => {
    if (data && isSuccess && previousDataRef.current !== data) {
      if (!data?.data?.content.length) {
        setHasMore(false);
        return;
      }
      previousDataRef.current = data;
      setChats(prevChats => [...prevChats, ...data.data.content]);
    }
  }, [data, isSuccess, page]);

  const handleScroll = useCallback(
    throttle(() => {
      if (!hasMore) return;

      const scrollContainer = scrollContainerRef.current;
      const scrollHeight = scrollContainer.scrollHeight;
      const scrollTop = scrollContainer.scrollTop;
      const clientHeight = scrollContainer.clientHeight;

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

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  // ---------------- TEST ------------------
  useEffect(() => {
    const connectToWebSocket = () => {
      const client = new Client({
        webSocketFactory: () => new SockJS('http://192.168.0.152:8082/ws'),
        onConnect: () => {
          setStompClient(client);
          client.subscribe('/topic/new-chatroom', message => {
            const parsedMessage = JSON.parse(message.body);
            console.log('Message received from server:', parsedMessage);
            refetch();
          });
        },
        onStompError: frame => {
          console.error('STOMP Error:', frame.headers['message']);
          console.error('Details:', frame.body);
        },
        onWebSocketClose: event => {
          console.log('WebSocket closed:', event);
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

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/app/chatroom/${idRoom}`,
        body: JSON.stringify({
          chatRoomId: 12,
          senderId: receiverId,
          receiverId: id,
          content: inputValue,
          chatType: 'TEXT',
        }),
      });
      setInputValue('');
    } else {
      console.error('STOMP client is not connected!');
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b bg-white py-4">
        <div className="flex h-10 items-center gap-3 px-5">
          {isMobileAndTablet && (
            <IconButton onClick={() => dispatch(showSidebar())}>
              <MenuIcon />
            </IconButton>
          )}
          <Avatar>G</Avatar>
          <p className="text-base font-medium text-gray-700">{namePartnerChat}</p>
        </div>
      </div>

      <div className="relative h-full overflow-y-auto bg-gray-50">
        <div ref={scrollContainerRef} className="h-[90%] space-y-2 overflow-y-auto px-12 py-8">
          {chats.length > 0 ? (
            chats?.map(message => (
              <div key={message.id} className={`flex ${message.receiver.id === id ? ' justify-end ' : ''}`}>
                <div className="my-1 flex flex-col">
                  <div
                    className={`flex rounded-bl-lg rounded-br-lg px-4 py-2 shadow-lg ${
                      message.receiver.id === id ? ' justify-end  rounded-tl-lg bg-[#246AA3] text-white' : 'rounded-tr-lg bg-white'
                    }`}>
                    <p>{message.content}</p>
                  </div>
                  <p className={`${message.receiver.id === id ? 'text-right' : 'text-left'} mt-1 text-xs text-[#4B465C]`}>
                    {dayjs(message.createAt).format('HH:mm')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Hãy bắt đầu cuộc trò chuyện bằng một lời chào 😍</p>
          )}
        </div>

        <div className="absolute bottom-5 left-1/2 flex w-[96%] -translate-x-1/2 transform items-center rounded-lg bg-white shadow-md">
          <TextArea
            rows={1}
            placeholder="Nhập tin nhắn..."
            className="w-full resize-none border-none focus:outline-none"
            onChange={e => setInputValue(e.target.value)}
          />
          <IconButton className="!p-2" onClick={() => sendMessage()}>
            <SendIcon className="text-primary-main" fontSize="medium" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatRight;
