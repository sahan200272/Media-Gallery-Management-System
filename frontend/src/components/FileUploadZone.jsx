import React, { useState } from 'react';

const FileUploadZone = ({ onFilesChange, previews = [], label = "Images * (JPG/PNG, max 5MB each)" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const validateFiles = (files) => {
    const validFiles = [];
    const errors = [];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Only JPG and PNG files are allowed`);
      } else if (file.size > maxSize) {
        errors.push(`${file.name}: File size must be less than 5MB`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setError(errors.join('. '));
    } else {
      setError('');
    }

    return validFiles;
  };

  const createImagePreviews = (files) => {
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    processFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      const newPreviews = createImagePreviews(validFiles);
      onFilesChange(validFiles, newPreviews);
    }
  };

  const removeImage = (index) => {
    const newFiles = previews.filter((_, i) => i !== index).map(p => p.file);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke URL to free memory
    URL.revokeObjectURL(previews[index].url);
    
    onFilesChange(newFiles, newPreviews);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-800 rounded-lg text-xs">
          {error}
        </div>
      )}
      
      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-400'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          multiple
          accept="image/jpeg,image/jpg,image/png"
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="text-gray-400 text-5xl mb-3">📁</div>
          <p className="text-gray-700 font-medium mb-1">
            Drag & drop images here
          </p>
          <p className="text-gray-500 text-sm mb-3">or</p>
          <span className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Browse Files
          </span>
          <p className="text-xs text-gray-500 mt-3">
            Supported formats: JPG, PNG • Max size: 5MB per file
          </p>
        </label>
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Selected Images ({previews.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview.url}
                  alt={preview.name}
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  ×
                </button>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {preview.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
