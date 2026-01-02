import React, { useState, useEffect } from 'react';
import { getAllMedia, uploadMedia } from '../services/media';

const Home = ({ onRegisterClick }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    tags: '',
    images: []
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

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

  const handleUploadClick = () => {
    setShowUploadModal(true);
    setUploadError('');
    setUploadSuccess('');
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setUploadForm({
      title: '',
      description: '',
      tags: '',
      images: []
    });
    setUploadError('');
    setUploadSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setUploadForm(prev => ({
      ...prev,
      images: Array.from(e.target.files)
    }));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');
    setUploadSuccess('');

    if (!uploadForm.title || !uploadForm.description || uploadForm.images.length === 0) {
      setUploadError('Please fill in all fields and select at least one image');
      return;
    }

    setUploadLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', uploadForm.title);
      formData.append('description', uploadForm.description);
      
      // Convert tags string to array and append
      const tagsArray = uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      formData.append('tags', JSON.stringify(tagsArray));

      // Append all images
      uploadForm.images.forEach((image) => {
        formData.append('images', image);
      });

      await uploadMedia(formData);
      
      setUploadSuccess('Media uploaded successfully!');
      
      // Refresh media list
      await fetchMedia();
      
      // Close modal after 1.5 seconds
      setTimeout(() => {
        closeUploadModal();
      }, 1500);
      
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploadLoading(false);
    }
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
              <button 
                onClick={handleUploadClick}
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={closeUploadModal}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upload Media</h2>
                <button
                  onClick={closeUploadModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Messages */}
              {uploadError && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
                  {uploadError}
                </div>
              )}
              {uploadSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
                  {uploadSuccess}
                </div>
              )}

              {/* Upload Form */}
              <form onSubmit={handleUploadSubmit} className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={uploadForm.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter media title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={uploadForm.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter media description"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={uploadForm.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., nature, landscape, photography"
                  />
                </div>

                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                    Images * (Multiple files allowed)
                  </label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  {uploadForm.images.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                      {uploadForm.images.length} file(s) selected
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={uploadLoading}
                    className="flex-1 bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadLoading ? 'Uploading...' : 'Upload Media'}
                  </button>
                  <button
                    type="button"
                    onClick={closeUploadModal}
                    disabled={uploadLoading}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
