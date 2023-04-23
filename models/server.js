import express from 'express';
import cors from 'cors';
import { products, shoppingCart } from '../routes/index.js';
import { dbConnection } from "../database/config.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = null;
        
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

    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

    close() {
        this.server.close();
    }

}

export default Server;