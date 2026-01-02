const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const logActivity = async (userId, action, taskId = null, details = null) => {
    try {
        await prisma.activityLog.create({
            data: {
                userId,
                action,
                taskId,
                details: details ? JSON.stringify(details) : null
            }
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
};

module.exports = {
    logActivity
};
