import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Types } from 'mongoose';

export const createHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10)
}

export const isValidPassword = async (password: string, passwordHash: string): Promise<boolean> => {
    return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user: {
    id: Types.ObjectId;
    password: string;
    email: string;
}): Promise<string> => {
    return await jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '1m' });
}