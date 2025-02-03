import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChangePasswordModal from '../components/ChangePasswordModal';

function Profile() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // Format the timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Profile Information</h1>
        </div>
        
        <div className="p-6">
          {/* Profile Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-4xl text-gray-600">
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-sm text-gray-600 uppercase">Username</h2>
              <p className="text-lg font-medium">{user?.username}</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-sm text-gray-600 uppercase">Email</h2>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-sm text-gray-600 uppercase">Token Created</h2>
              <p className="text-lg font-medium">
                {formatDate(user?.iat)}
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-sm text-gray-600 uppercase">Token Expires</h2>
              <p className="text-lg font-medium">
                {formatDate(user?.exp)}
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-sm text-gray-600 uppercase">User ID</h2>
              <p className="text-lg font-medium text-gray-500">
                {user?.userId}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Edit Profile
            </button>
            <button 
              onClick={() => setIsChangePasswordOpen(true)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal 
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
}

export default Profile;
