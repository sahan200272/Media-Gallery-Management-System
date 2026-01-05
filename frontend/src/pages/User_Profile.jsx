import { useNavigate } from "react-router-dom";

export default function UserProfile(){

    const navigate = useNavigate();

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
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
                        <div className="text-center">
                            <div className="mx-auto h-24 w-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">User Profile</h2>
                            <p className="text-gray-600 mt-2">Manage your account information</p>
                        </div>
                    </div>

                    {/* Profile Content Placeholder */}
                    <div className="space-y-6">
                        <div className="border-t border-gray-200 pt-6">
                            <p className="text-center text-gray-500">Profile features coming soon...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}