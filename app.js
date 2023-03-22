import * as dotenv from 'dotenv';
dotenv.config();
import Server from './models/Server.js';

const server = new Server();

server.listen();