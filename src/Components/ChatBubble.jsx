import React from 'react';

export function ChatBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] px-4 py-2 rounded-lg ${
        isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
      }`}>
        <p>{message.content}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}