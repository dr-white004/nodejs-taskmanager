const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');
const { logActivity } = require('./activityLog');

const register = async (userData) => {
    const { username, email, password, role, adminSecret } = userData;

    // Check if role is admin and verify secret
    let finalRole = 'user';
    if (role === 'admin') {
        if (adminSecret !== process.env.ADMIN_SECRET) {
            throw new Error('Invalid Admin Secret');
        }
        finalRole = 'admin';
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            role: finalRole
        }
    });

    await logActivity(user.id, 'REGISTER', null, { username: user.username, role: user.role });

    return user;
};

const login = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user || !(await comparePassword(password, user.password))) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user);

    await logActivity(user.id, 'LOGIN');

    return { user, token };
};

module.exports = {
    register,
    login
};
