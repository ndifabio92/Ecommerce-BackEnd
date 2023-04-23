import * as dotenv from 'dotenv';

const { NODE_ENV } = process.env;
const env = NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: env });

import Server from './models/server.js';

const server = new Server();

server.start();
export default server;