import express, { Application } from "express";
import http from "http";
import cors from 'cors';
import { products, carts, users, session } from "../routes/index.js";
import dbConnection from '../database/config.js';

type paths = {
    products: string,
    users: string,
    carts: string,
    session: string
}

class Server {
    private static instance: Server;
    private app: Application;
    private port: string;
    private server: null | http.Server;
    private apiPaths: paths = {
        products: '/api/products',
        users: '/api/signup',
        carts: '/api/carts',
        session: '/api/session'
    };


    private constructor() {
        Server.instance = this;

        this.app = express();
        this.port = process.env.PORT || '9000';
        this.server = null;
        this.connectDB();
        this.middleware();
        this.routes();
    }

    async connectDB() {
        await dbConnection.connect();
    }

    public static getInstance(): Server {
        if (!this.instance) this.instance = new Server();
        return this.instance;
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.apiPaths.products, products);
        this.app.use(this.apiPaths.carts, carts);
        this.app.use(this.apiPaths.users, users);
        this.app.use(this.apiPaths.session, session);
    }

    start() {
        this.server = this.app.listen(this.port, () => console.log('Servidor corriendo en el puerto', this.port));
    }

    close() {
        this.server?.close();
    }
}

export default Server;