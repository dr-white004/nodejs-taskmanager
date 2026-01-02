const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logActivity } = require('./activityLog');

const getAllTasks = async () => {
    return await prisma.task.findMany({
        include: { user: { select: { username: true, role: true } } },
        orderBy: { createdAt: 'desc' }
    });
};

const createTask = async (taskData, userId) => {
    const task = await prisma.task.create({
        data: {
            ...taskData,
            userId
        }
    });

    await logActivity(userId, 'CREATE_TASK', task.id, { title: task.title });
    return task;
};

const updateTask = async (taskId, updateData, userId, userRole) => {
    const existingTask = await prisma.task.findUnique({ where: { id: taskId } });
    if (!existingTask) throw new Error('Task not found');

    // RBAC: Users can only update status/details, Admins can do anything
    // In this requirement, users can edit task title/description too.
    // "Regular users should have the ability to edit tasks and mark them as completed, but not delete them."

    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: updateData
    });

    await logActivity(userId, 'UPDATE_TASK', taskId, updateData);
    return updatedTask;
};

const deleteTask = async (taskId, userId, userRole) => {
    if (userRole !== 'admin') {
        throw new Error('Unauthorized: Only admins can delete tasks');
    }

    const existingTask = await prisma.task.findUnique({ where: { id: taskId } });
    if (!existingTask) throw new Error('Task not found');

    await prisma.task.delete({ where: { id: taskId } });
    await logActivity(userId, 'DELETE_TASK', taskId, { title: existingTask.title });

    return { message: 'Task deleted successfully' };
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};
