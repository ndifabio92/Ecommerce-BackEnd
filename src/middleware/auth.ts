import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";

type UserProp = {
    firstName: string;
    lastName:string;
    email: string;
}
const auth = (req: Request & { user: UserProp }, res: Response, next: NextFunction) => {
    const authHeader: string = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: 'Empty authentication header!' })
    }

    const token: string = authHeader.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_KEY, (error:jwt.VerifyErrors, credentials: JwtPayload) => {
        if (error) return res.status(403).send({ error: 'Authentication error' });

        req.user = credentials.user;
        next();
    });
}

export default auth;