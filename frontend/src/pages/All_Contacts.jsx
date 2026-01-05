import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../services/fetcher";

export default function GetAllContacts(){

    const navigate = useNavigate();
    const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

    const {data, error, isLoading} = useSWR(`${VITE_BACKEND_API_URL}/contacts/`, fetcher);

    if(isLoading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
                    <h1 className="mt-4 text-xl font-semibold text-gray-700">Loading contacts...</h1>
                </div>
            </div>
        );
    }

    if(error){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Error: {error.message}</h1>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button 
                        onClick={() => navigate('/gallery')}
                        className="text-indigo-600 hover:text-indigo-800 font-medium mb-4 flex items-center gap-2 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Gallery
                    </button>
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
                                <p className="text-gray-600 mt-1">
                                    {data?.contacts?.length || 0} message{data?.contacts?.length !== 1 ? 's' : ''} received
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contacts List */}
                {data && data.contacts && data.contacts.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12">
                        <div className="text-center">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No messages yet</h3>
                            <p className="mt-2 text-gray-500">Contact messages will appear here when users reach out.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {data && data.contacts && data.contacts.map((contact) => (
                            <div 
                                key={contact._id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {/* Contact Info */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
                                                <a 
                                                    href={`mailto:${contact.email}`}
                                                    className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {contact.email}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-500">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Message:</p>
                                            <p className="text-gray-800 whitespace-pre-wrap">{contact.message}</p>
                                        </div>

                                        {/* Timestamp */}
                                        {contact.createdAt && (
                                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {new Date(contact.createdAt).toLocaleString()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}