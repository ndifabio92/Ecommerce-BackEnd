import session from 'express-session'
import mongoStore from 'connect-mongo';
import { request, response } from 'express';

const sessionMiddleware = (req = request, res = response, next) => {
    const sessionHandler = session({
        store: mongoStore.create({
            mongoUrl: `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_NAME}`,
            ttl: 10
        }),
        saveUninitialized: false,
        secret: 'secretstring',
        resave: false
    });

    sessionHandler(req, res, next);
};

export default sessionMiddleware;