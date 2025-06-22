import React, { useState } from 'react';
import { User } from '../types';
import AccountModal from './AccountModal';

interface WindowHeaderProps {
  user: User;
}

const WindowHeader: React.FC<WindowHeaderProps> = ({ user }) => {
  const [showAccountModal, setShowAccountModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 select-none">
        {/* App Title */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
          </div>
          <span className="text-lg font-semibold text-gray-800">Mercor MVP</span>
        </div>

        {/* User Avatar */}
        <button
          onClick={() => setShowAccountModal(true)}
          className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-semibold text-sm hover:bg-green-500 transition-colors duration-200"
        >
          {user.email[0].toUpperCase()}
        </button>
      </div>

      {/* Account Modal */}
      {showAccountModal && (
        <AccountModal 
          user={user} 
          onClose={() => setShowAccountModal(false)} 
        />
      )}
    </>
  );
};

export default WindowHeader;