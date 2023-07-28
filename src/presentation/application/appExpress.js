import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import {cartRoute, emailRoute, productRoute, sessionRoute, userRoute} from '../routes/index.js';
import DbFactory from "../../data/factories/dbFactory.js";
import swaggerOptions from "../../configuration/swaggerConfig.js";
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUiExpress from 'swagger-ui-express'

class AppExpress {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = null;
        this.connectDB();
        this.middlewares();
        this.routes();
        this.swagger();

        if (AppExpress.instance) return AppExpress.instance;

        AppExpress.instance = this;
    }

    async connectDB() {
        const db = DbFactory.create(process.env.DB);
        db.connect();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors());
        this.app.use(cookieParser());
    }

    routes() {
        this.app.use('/api/products', productRoute);
        this.app.use('/api/carts', cartRoute);
        this.app.use('/api/signup', userRoute);
        this.app.use('/api/session', sessionRoute);
        this.app.use('/api/email', emailRoute);
    }

    swagger() {
        this.app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJsdoc(swaggerOptions)));
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

export default AppExpress;