import React from 'react';

const MediaDetailModal = ({ media, onClose, onEdit, onDelete }) => {
  if (!media) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {media.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Images Gallery */}
          {media.images && media.images.length > 0 && (
            <div className="grid grid-cols-1 gap-4 mb-6">
              {media.images.map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`${media.title} - ${index + 1}`}
                  className="w-full rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{media.description}</p>
          </div>

          {/* Tags */}
          {media.tags && media.tags.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {media.tags.map((tag, index) => (
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
          <div className="text-sm text-gray-500 mb-6">
            Created on {new Date(media.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                onClose();
                onEdit(media);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Media
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(media._id);
              }}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailModal;
