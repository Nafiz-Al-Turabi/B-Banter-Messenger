import React from 'react';
import { Avatar } from './Avatar';

export function UserListItem({ user, selected, onClick, unreadCount, showEmail ,lastMessage}) {
    return (
        <div
            onClick={() => onClick(user)}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 
        ${selected ? 'bg-gray-100' : ''}`}
        >
            <Avatar username={user.username} online={user.online} />
            <div className="ml-4 flex-1">
                <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-800">{user.username}</h3>
                    {lastMessage && (
                        <span className="text-sm text-gray-500">
                            {new Date(lastMessage.timestamp).toLocaleTimeString()}
                        </span>
                    )}
                </div>
                {lastMessage && (
                    <p className="text-sm text-gray-500 truncate">{lastMessage.content}</p>
                )}
            </div>
            {unreadCount > 0 && (
                <div className="ml-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {unreadCount}
                </div>
            )}
        </div>
    );
}