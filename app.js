import * as dotenv from 'dotenv';
import Server from './models/server.js';

const { NODE_ENV } = process.env;
const env = NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: env });

const server = new Server();

server.start();


export default server;