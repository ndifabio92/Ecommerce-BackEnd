import express from 'express';
import {createServer} from "http";
import {Server as serverIO} from "socket.io";
import {engine} from "express-handlebars";
import {resolve} from 'path';
import {home, products, shoppingCart, realTimeProducts} from '../routes/index.js';
import socketController from "../controller/sockets/controller.js";

class Server {
    constructor() {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.port = process.env.PORT;
        this.io = new serverIO(this.httpServer);
        this.viewsPath = resolve('./views');

        this.middlewares();
        this.routes();
        this.views();
        this.sockets();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    routes() {
        this.app.use('/', home);
        this.app.use('/api/products', products);
        this.app.use('/api/carts', shoppingCart);
        this.app.use('/api/realtimeproducts', realTimeProducts);
    }

    views() {
        this.app.engine('handlebars', engine({
            layoutsDir: `${this.viewsPath}/layouts`,
            defaultLayout: `${this.viewsPath}/layouts/main.handlebars`
        }));
        this.app.set('view engine', 'handlebars');
        this.app.set('views', this.viewsPath);

    }

    sockets() {
        this.io.on('connection', socketController);
        this.app.set("io", this.io);
    }

    listen() {
        this.httpServer.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

export default Server;