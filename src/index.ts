import dotenv from 'dotenv';
import Server from './model/server.js';
dotenv.config();

const server = Server.getInstance();
server.start();