import React, { useState } from 'react';
import { updateMedia } from '../services/media';
import FileUploadZone from './FileUploadZone';

const EditMediaModal = ({ isOpen, media, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: media?.title || '',
    description: media?.description || '',
    tags: media?.tags ? media.tags.join(', ') : '',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);

  // Update form when media prop changes
  React.useEffect(() => {
    if (media) {
      setFormData({
        title: media.title || '',
        description: media.description || '',
        tags: media.tags ? media.tags.join(', ') : '',
        images: []
      });
      setImagePreviews([]);
      setError('');
      setSuccess('');
    }
  }, [media]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilesChange = (files, previews) => {
    setFormData(prev => ({
      ...prev,
      images: files
    }));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      data.append('tags', JSON.stringify(tagsArray));

      // Only append images if new ones are selected
      if (formData.images.length > 0) {
        formData.images.forEach((image) => {
          data.append('images', image);
        });
      }

      await updateMedia(media._id, data);
      
      setSuccess('Media updated successfully!');
      
      setTimeout(() => {
        handleClose();
        if (onSuccess) onSuccess();
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed. Please try again.');
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      tags: '',
      images: []
    });
    setImagePreviews([]);
    setError('');
    setSuccess('');
    onClose();
  };

  if (!isOpen || !media) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Edit Media</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter media title"
                required
              />
            </div>

            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter media description"
                required
              />
            </div>

            <div>
              <label htmlFor="edit-tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="edit-tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., nature, landscape, photography"
              />
            </div>

            {/* Current Images Display */}
            {media.images && media.images.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Images
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                  {media.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.imageUrl}
                        alt={`Current ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 italic">
                  Upload new images below to replace these
                </p>
              </div>
            )}

            <FileUploadZone
              onFilesChange={handleFilesChange}
              previews={imagePreviews}
              label="Replace Images (Optional - JPG/PNG, max 5MB each)"
            />

            {imagePreviews.length > 0 && (
              <p className="text-sm text-blue-600 font-medium">
                ⚠ New images will replace all current images
              </p>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Media'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMediaModal;
