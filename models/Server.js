import express from 'express';
import router from '../routes/products.js';

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
        this.app.use('', router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

export default Server;