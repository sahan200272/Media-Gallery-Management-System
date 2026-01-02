import React from 'react';

const MediaCard = ({ media, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Preview */}
      <div 
        className="relative aspect-square bg-gray-200 cursor-pointer"
        onClick={() => onView(media)}
      >
        {media.images && media.images.length > 0 ? (
          <img
            src={media.images[0].imageUrl}
            alt={media.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
        {media.images && media.images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs">
            +{media.images.length - 1} more
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
          {media.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {media.description}
        </p>
        
        {/* Tags */}
        {media.tags && media.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {media.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {media.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{media.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Date */}
        <p className="text-xs text-gray-400 mb-3">
          {new Date(media.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(media);
            }}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(media._id);
            }}
            className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
