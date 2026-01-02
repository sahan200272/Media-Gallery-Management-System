import React, { useState, useEffect } from 'react';
import { getAllMedia, deleteMedia } from '../services/media';
import MediaCard from '../components/MediaCard';
import MediaDetailModal from '../components/MediaDetailModal';
import UploadMediaModal from '../components/UploadMediaModal';
import EditMediaModal from '../components/EditMediaModal';

const Home = ({ onRegisterClick }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const data = await getAllMedia();
      setMedia(data);
      setError(null);
    } catch (err) {
      setError('Failed to load media. Please try again later.');
      console.error('Error fetching media:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMedia = (mediaItem) => {
    setSelectedMedia(mediaItem);
  };

  const handleEditMedia = (mediaItem) => {
    setEditingMedia(mediaItem);
    setShowEditModal(true);
  };

  const handleDeleteMedia = async (mediaId) => {
    if (!window.confirm('Are you sure you want to delete this media? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteMedia(mediaId);
      setMedia(prev => prev.filter(item => item._id !== mediaId));
      if (selectedMedia && selectedMedia._id === mediaId) {
        setSelectedMedia(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed. Please try again.');
      console.error('Delete error:', err);
    }
  };

  const handleUploadSuccess = () => {
    fetchMedia();
  };

  const handleEditSuccess = () => {
    fetchMedia();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading media...</p>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-800">{error}</p>
          <button 
            onClick={fetchMedia}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Media Gallery</h1>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Upload Media
              </button>
              <button 
                onClick={onRegisterClick}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {media.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No media yet</h3>
            <p className="text-gray-500">Upload some images to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {media.map((item) => (
              <MediaCard
                key={item._id}
                media={item}
                onView={handleViewMedia}
                onEdit={handleEditMedia}
                onDelete={handleDeleteMedia}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <MediaDetailModal
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
        onEdit={handleEditMedia}
        onDelete={handleDeleteMedia}
      />

      <UploadMediaModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={handleUploadSuccess}
      />

      <EditMediaModal
        isOpen={showEditModal}
        media={editingMedia}
        onClose={() => {
          setShowEditModal(false);
          setEditingMedia(null);
        }}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default Home;

