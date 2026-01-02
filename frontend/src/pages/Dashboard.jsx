import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, ListChecks, History } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [logs, setLogs] = useState([]);
    const [showLogs, setShowLogs] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchLogs = async () => {
        if (user.role !== 'admin') return;
        try {
            const response = await api.get('/logs');
            setLogs(response.data);
        } catch (err) {
            console.error('Failed to fetch logs', err);
        }
    };

    useEffect(() => {
        fetchTasks();
        if (user.role === 'admin') {
            fetchLogs();
        }
    }, [user]);

    const handleTaskAction = () => {
        fetchTasks();
        if (user.role === 'admin') {
            fetchLogs();
        }
        setShowTaskForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 pb-20">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 mt-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-3">
                        <ListChecks className="h-8 w-8 text-blue-500" />
                        <h1 className="text-3xl font-bold">Your Tasks</h1>
                    </div>

                    <div className="flex space-x-4">
                        {user.role === 'admin' && (
                            <button
                                onClick={() => setShowLogs(!showLogs)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                            >
                                <History className="h-5 w-5 text-purple-500" />
                                <span>{showLogs ? 'Show Tasks' : 'Activity Logs'}</span>
                            </button>
                        )}

                        {user.role === 'admin' && (
                            <button
                                onClick={() => setShowTaskForm(true)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                            >
                                <Plus className="h-5 w-5" />
                                <span>New Task</span>
                            </button>
                        )}
                    </div>
                </div>

                {showLogs ? (
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-300">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-blue-400">
                                            {log.user.username}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${log.action.includes('CREATE') ? 'bg-green-500/20 text-green-500' :
                                                    log.action.includes('DELETE') ? 'bg-red-500/20 text-red-500' :
                                                        'bg-blue-500/20 text-blue-500'
                                                }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            {log.details || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <TaskCard key={task.id} task={task} onAction={handleTaskAction} />
                        ))}
                        {tasks.length === 0 && !loading && (
                            <div className="col-span-full py-20 text-center text-gray-500 bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl">
                                No tasks found. Create one to get started!
                            </div>
                        )}
                    </div>
                )}

                {showTaskForm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="max-w-md w-full">
                            <TaskForm onCancel={() => setShowTaskForm(false)} onSave={handleTaskAction} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
