import * as dotenv from 'dotenv';
import AppFactory from "./presentation/factories/appFactory.js";

const { NODE_ENV } = process.env;
const env = NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: env });

const server = AppFactory.create(process.env.APPLICATION);
server.start();


export default server;