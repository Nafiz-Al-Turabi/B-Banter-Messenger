import React, { useState } from 'react';
import {
    MoreVertical,
    Search,
    Phone,
    Video,
    Paperclip,
    Camera,
    Mic,
    Send,
    Menu,
    X
} from 'lucide-react';

export default function ChatInterface() {
    const [message, setMessage] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const demoMessages = [
        { id: 1, text: "Hey! How are you doing?", sender: 'other', time: '09:30' },
        { id: 2, text: "I'm good, thanks! Just working on some new designs.", sender: 'me', time: '09:31' },
        { id: 3, text: "That sounds interesting! Can you show me what you're working on?", sender: 'other', time: '09:32' },
        { id: 4, text: "Of course! I'll send you some screenshots soon.", sender: 'me', time: '09:33' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 relative">
            {/* Mobile menu button */}
            <button
                className="md:hidden absolute top-4 left-4 z-50"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <Menu size={24} />
            </button>

            {/* Sidebar - Now with mobile toggle */}
            <div className={`
        fixed md:relative top-0 left-0 h-full bg-white border-r z-40
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:w-80
      `}>
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-semibold">Messages</h1>
                        <div className="flex items-center">
                            <button
                                className="md:hidden p-2 hover:bg-gray-100 rounded-full mr-2"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X size={20} />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search chats"
                            className="w-full p-2 pl-8 bg-gray-100 rounded-lg focus:outline-none"
                        />
                        <Search className="absolute left-2 top-2.5 text-gray-500" size={18} />
                    </div>
                </div>
                <div className="overflow-y-auto h-[calc(100%-5rem)]">
                    {/* Chat list */}
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <img src="/api/placeholder/40/40" className="w-12 h-12 rounded-full" alt="avatar" />
                            <div className="ml-4 flex-1">
                                <div className="flex justify-between">
                                    <h2 className="font-semibold">User Name</h2>
                                    <span className="text-sm text-gray-500">12:30</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">Last message preview...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main chat area */}
            <div className="flex-1 flex flex-col">
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b bg-white">
                    <div className="flex items-center">
                        <div className="w-10 ml-8 md:ml-0 md:w-auto">
                            <img src="/api/placeholder/40/40" className="w-10 h-10 rounded-full" alt="avatar" />
                        </div>
                        <div className="ml-4">
                            <h2 className="font-semibold">John Doe</h2>
                            <p className="text-sm text-gray-500">Online</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Phone size={20} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Video size={20} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {demoMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg p-3`}>
                                <p>{msg.text}</p>
                                <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input area */}
                <div className="p-4 bg-white border-t">
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-2 border rounded-full focus:outline-none focus:border-blue-500"
                        />
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Camera size={20} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Mic size={20} />
                        </button>
                        <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}