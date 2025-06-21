import React, { useState } from 'react';
import { X } from 'lucide-react';
import { User } from '../types';
import AccountModal from './AccountModal';

interface WindowHeaderProps {
  user: User;
}

const WindowHeader: React.FC<WindowHeaderProps> = ({ user }) => {
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleMinimize = () => {
    // In Electron, you would call: window.electronAPI.minimize()
    console.log('Minimize window');
  };

  const handleMaximize = () => {
    // In Electron, you would call: window.electronAPI.maximize()
    console.log('Maximize window');
  };

  const handleClose = () => {
    // In Electron, you would call: window.electronAPI.close()
    console.log('Close window');
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 select-none">
        {/* Window Controls */}
        {/* <div className="flex items-center space-x-2">
          <button
            onClick={handleClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-150"
            aria-label="Close"
          />
          <button
            onClick={handleMinimize}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-150"
            aria-label="Minimize"
          />
          <button
            onClick={handleMaximize}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-150"
            aria-label="Maximize"
          />
        </div> */}

        {/* App Title */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-4 bg-indigo-500 rounded-sm"></div>
            <div className="w-1 h-3 bg-indigo-400 rounded-sm"></div>
            <div className="w-2 h-5 bg-indigo-600 rounded-sm"></div>
            <div className="w-1 h-2 bg-indigo-300 rounded-sm"></div>
          </div>
          <span className="text-lg font-semibold text-gray-800">Mercor MVP</span>
        </div>

        {/* User Avatar */}
        <button
          onClick={() => setShowAccountModal(true)}
          className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-semibold text-sm hover:bg-green-500 transition-colors duration-200"
        >
          {user.avatar}
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