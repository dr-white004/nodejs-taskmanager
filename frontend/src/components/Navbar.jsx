import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, CheckCircle } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                    <span className="text-xl font-bold tracking-tight">TaskFlow</span>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
                            <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium leading-none">{user?.username}</p>
                            <p className="text-xs text-gray-500 mt-1 capitalize">{user?.role}</p>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden sm:block">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
