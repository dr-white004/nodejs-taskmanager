const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getActivityLogs = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const logs = await prisma.activityLog.findMany({
            include: {
                user: { select: { username: true } },
                task: { select: { title: true } }
            },
            orderBy: { timestamp: 'desc' },
            take: 100
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getActivityLogs };
