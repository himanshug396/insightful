import React from 'react';
import { X, Check } from 'lucide-react';
import { User } from '../types';

interface AccountModalProps {
  user: User;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ user, onClose }) => {
  const handleSignOut = () => {
    // Handle sign out logic
    console.log('Sign out');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Account</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 text-center">
          <div className="w-24 h-24 bg-green-400 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            {user.email[0].toString()}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
          <p className="text-gray-600 mb-6 text-sm">{user.email}</p>

          {/* Companies Section */}
          <div className="text-left">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
              Companies
            </h4>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="font-medium text-gray-800">{"MERCOR"}</span>
              <div className="p-1 bg-indigo-100 rounded-lg">
                <Check className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleSignOut}
            className="text-red-600 font-medium hover:text-red-700 transition-colors duration-200"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;