import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from "swr";
import { fetcher } from "../services/fetcher";

function MediaGallery(){

    const navigate = useNavigate();
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // access environment variable from .env
    const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

    const {data, error, isLoading} = useSWR(`${VITE_BACKEND_API_URL}/medias/`, fetcher);

    const openLightbox = (media, index = 0) => {
        setSelectedMedia(media);
        setCurrentImageIndex(index);
    };

    const closeLightbox = () => {
        setSelectedMedia(null);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (selectedMedia && currentImageIndex < selectedMedia.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    if(isLoading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
                    <h1 className="mt-4 text-xl font-semibold text-gray-700">Loading...</h1>
                </div>
            </div>
        );
    }

    if(error){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Error: {error.message}</h1>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Media Gallery</h1>
                            <p className="text-gray-600 mt-1">Browse your collection</p>
                        </div>
                        <button 
                            onClick={() => navigate('/add-media')}
                            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Media
                        </button>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {data && data.media && data.media.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No media found</h3>
                        <p className="mt-1 text-gray-500">Get started by adding your first media.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data && data.media && data.media.map((media) => (
                            <div 
                                key={media._id}
                                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                                onClick={() => openLightbox(media)}
                            >
                                {/* Card Image */}
                                <div className="relative h-64 bg-gray-200 overflow-hidden">
                                    {media.images && media.images.length > 0 ? (
                                        <img 
                                            src={media.images[0].imageUrl} 
                                            alt={media.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    {/* Image count badge */}
                                    {media.images && media.images.length > 1 && (
                                        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {media.images.length}
                                        </div>
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="p-4">
                                    <h2 className="text-lg font-bold text-gray-900 truncate">{media.title}</h2>
                                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{media.description}</p>
                                    {media.tags && (
                                        <div className="mt-3">
                                            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-medium">
                                                {media.tags}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedMedia && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Modal Content */}
                    <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                        {/* Image */}
                        <div className="relative">
                            {selectedMedia.images && selectedMedia.images.length > 0 && (
                                <img 
                                    src={selectedMedia.images[currentImageIndex].imageUrl}
                                    alt={selectedMedia.title}
                                    className="max-h-[80vh] w-full object-contain rounded-lg"
                                />
                            )}

                            {/* Previous Button */}
                            {currentImageIndex > 0 && (
                                <button 
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full transition-all shadow-lg"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            {/* Next Button */}
                            {selectedMedia.images && currentImageIndex < selectedMedia.images.length - 1 && (
                                <button 
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full transition-all shadow-lg"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Image Info */}
                        <div className="mt-6 bg-white rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900">{selectedMedia.title}</h2>
                            <p className="text-gray-600 mt-2">{selectedMedia.description}</p>
                            {selectedMedia.tags && (
                                <div className="mt-3">
                                    <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-4 py-2 rounded-full font-medium">
                                        {selectedMedia.tags}
                                    </span>
                                </div>
                            )}
                            {selectedMedia.images && selectedMedia.images.length > 1 && (
                                <p className="text-sm text-gray-500 mt-4">
                                    Image {currentImageIndex + 1} of {selectedMedia.images.length}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
    
}

export default MediaGallery;