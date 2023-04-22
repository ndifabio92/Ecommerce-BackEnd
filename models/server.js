import express from 'express';
import cors from 'cors';
import { products, shoppingCart } from '../routes/index.js';
import { dbConnection } from "../database/config.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    routes() {
        this.app.use('/api/products', products);
        this.app.use('/api/carts', shoppingCart);
    }

    listen() {
        this.app.listen(this.port || 9000, () => {
            console.log(`Servidor corriendo en el puerto ${this.port || 9000}`);
        })
    }
}

export default Server;