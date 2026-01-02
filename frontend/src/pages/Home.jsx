import React, { useState, useEffect } from 'react';
import { getAllMedia } from '../services/media';

const Home = ({ onRegisterClick }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

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

  const openModal = (mediaItem) => {
    setSelectedMedia(mediaItem);
  };

  const closeModal = () => {
    setSelectedMedia(null);
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
  }

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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Media Gallery</h1>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
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
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(item)}
              >
                {/* Image Preview */}
                <div className="relative aspect-square bg-gray-200">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                  {item.images && item.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs">
                      +{item.images.length - 1} more
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Date */}
                  <p className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal for viewing full media details */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedMedia.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Images Gallery */}
              {selectedMedia.images && selectedMedia.images.length > 0 && (
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {selectedMedia.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.imageUrl}
                      alt={`${selectedMedia.title} - ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedMedia.description}</p>
              </div>

              {/* Tags */}
              {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMedia.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Date */}
              <div className="text-sm text-gray-500">
                Created on {new Date(selectedMedia.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
