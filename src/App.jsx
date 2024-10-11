import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import io from 'socket.io-client';
import { Avatar } from './components/Avatar';
import { ChatBubble } from './components/ChatBubble';
import { UserListItem } from './components/UserListItem';
import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/solid';

const socket = io('http://localhost:5000');  // Replace with your actual server URL

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [unreadCounts, setUnreadCounts] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit('join', user._id);
    }
    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    socket.on('newMessage', handleNewMessage);
    return () => socket.off('newMessage');
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(()=>{
    fetchMessages()
    fetchUsers()
  },[])
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewMessage = (data) => {
    if (selectedUser && data.sender === selectedUser._id) {
      setMessages(prev => [...prev, data.message]);
    } else {
      setUnreadCounts(prev => ({
        ...prev,
        [data.sender]: (prev[data.sender] || 0) + 1
      }));
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.filter(u => u._id !== user._id));
      console.log(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch users');
    }
  };

  const fetchMessages = async (recipientId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${user._id}/${recipientId}`);
      setMessages(response.data);
      setUnreadCounts(prev => ({ ...prev, [recipientId]: 0 }));
    } catch (error) {
      setError('Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/login', loginData,); // Updated to use email
      setUser(response.data);
      setIsLoginModalOpen(false);
      fetchUsers(); 
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      socket.emit('sendMessage', {
        senderId: user._id,
        recipientId: selectedUser._id,
        content: newMessage
      });
      setMessages(prev => [...prev, {
        sender: user._id,
        recipient: selectedUser._id,
        content: newMessage,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 
            transition-colors duration-200"
        >
          Login to Chat
        </button>

        <Dialog
          open={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg z-20 w-96 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Login</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold
                    hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Avatar username={user.username} online={true} />
            <h2 className="ml-4 text-xl font-bold">{user.username}</h2>
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-73px)]">
          {users.map(u => (
            <UserListItem
              key={u._id}
              user={u}
              selected={selectedUser && selectedUser._id === u._id}
              onClick={() => {
                setSelectedUser(u);
                fetchMessages(u._id);
              }}
              unreadCount={unreadCounts[u._id] || 0}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b bg-white">
              <div className="flex items-center">
                <Avatar username={selectedUser.username} online={true} />
                <h2 className="ml-4 text-xl font-bold">{selectedUser.username}</h2>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <ChatBubble
                    key={index}
                    message={message}
                    isOwn={message.sender === user._id}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white border-t">
              <div className="flex items-center">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <PaperClipIcon className="h-5 w-5 text-gray-500" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 p-2 ml-2 border rounded-full focus:outline-none focus:border-blue-500"
                  placeholder="Type a message..."
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <PaperAirplaneIcon className="h-5 w-5 text-blue-500 transform " />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
