import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Trash2, Edit2, CheckCircle, Clock } from 'lucide-react';
import TaskForm from './TaskForm';

const TaskCard = ({ task, onAction }) => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const handleComplete = async () => {
        try {
            await api.put(`/tasks/${task.id}`, { status: 'completed' });
            onAction();
        } catch (err) {
            alert('Failed to complete task');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/tasks/${task.id}`);
            onAction();
        } catch (err) {
            alert('Failed to delete task');
        }
    };

    if (isEditing) {
        return (
            <TaskForm
                task={task}
                onCancel={() => setIsEditing(false)}
                onSave={() => {
                    onAction();
                    setIsEditing(false);
                }}
            />
        );
    }

    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {task.title}
                </h3>
                <span className={`px-2 py-1 text-[10px] font-black uppercase rounded ${task.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                    {task.status}
                </span>
            </div>

            <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                {task.description || 'No description provided.'}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div className="flex items-center text-xs text-gray-500 space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex space-x-2">
                    {task.status !== 'completed' && (
                        <button
                            onClick={handleComplete}
                            className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all"
                            title="Mark as completed"
                        >
                            <CheckCircle className="h-4 w-4" />
                        </button>
                    )}

                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                        title="Edit task"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>

                    {user.role === 'admin' && (
                        <button
                            onClick={handleDelete}
                            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            title="Delete task"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
