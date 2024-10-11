import React from 'react';

export function Avatar({ username, online }) {
  const initials = username?.split(' ').map(word => word[0]).join('').toUpperCase();
  
  return (
    <div className="relative">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white
        ${online ? 'bg-green-500' : 'bg-gray-400'}`}>
        {initials}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
      )}
    </div>
  );
}