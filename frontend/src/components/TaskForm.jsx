import React, { useState } from 'react';
import api from '../services/api';

const TaskForm = ({ task = null, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'pending'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (task) {
                await api.put(`/tasks/${task.id}`, formData);
            } else {
                await api.post('/tasks', formData);
            }
            onSave();
        } catch (err) {
            alert('Failed to save task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-white">
                {task ? 'Edit Task' : 'Create New Task'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                    <textarea
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32 resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                {task && (
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                        <select
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                )}
                <div className="flex space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors font-medium border border-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Task'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
