import express from 'express';
import { products } from '../routes/index.js'

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use('/api/products', products);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

export default Server;