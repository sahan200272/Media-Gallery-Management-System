import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddMedia(){

    const navigate = useNavigate();
    const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [images, setImages] = useState([]);

    function handleImages(e){

        setImages(Array.from(e.target.files))
    }

    function clearForm(){

        setTitle("");
        setDescription("");
        setTags("");
    }

    async function handleSubmit(e){

        e.preventDefault();

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
        
        images.forEach((image) => {
            formData.append('images', image);
        });

        try{
            const response = await axios.post(`${VITE_BACKEND_API_URL}/medias/upload`, formData);

            if(response.status == 200){
                clearForm();
                alert("Media Upload Successful!");
                navigate("/");
            }
            
        }catch(error){
            console.error(error.message);
            alert(error.message);
        }
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <button 
                            onClick={() => navigate('/')}
                            className="text-indigo-600 hover:text-indigo-800 font-medium mb-4 flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Gallery
                        </button>
                        <h2 className="text-3xl font-bold text-gray-900">Add New Media</h2>
                        <p className="text-gray-600 mt-2">Upload your media with details</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Title
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter media title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        {/* Description Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea 
                                placeholder="Enter description here"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Tags Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Tags
                            </label>
                            <input 
                                type="text" 
                                placeholder="Add tags (comma separated)"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Images
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition-colors">
                                <input 
                                    type="file" 
                                    multiple
                                    onChange={handleImages}
                                    accept="image/*"
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer cursor-pointer"
                                />
                                {images.length > 0 && (
                                    <p className="mt-3 text-sm text-gray-600">
                                        {images.length} file(s) selected
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button 
                                type="submit"
                                className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-lg hover:shadow-xl"
                            >
                                Upload Media
                            </button>
                            <button 
                                type="button"
                                onClick={clearForm}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}