import * as express from 'express';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/AuthenticationService';
import { HttpError } from '../ErrorHandler';

export async function auth(
    authenticationService: AuthenticationService,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    const tokenData: string[] | undefined = req.headers.authorization?.split(' ');
    const token: string | undefined = tokenData !== undefined && tokenData.length > 1 ? tokenData[1] : undefined;

    if (token === undefined) {
        const error = new Error('Authentication Required') as HttpError;
        error.status = 401;
        return next(error);
    }

    const user: User | undefined = await authenticationService.authenticateToken(token);
    if (user !== undefined) {
        res.locals.user = user;
        return next();
    } else {
        const error = new Error('Authorization error: Invalid token') as HttpError;
        error.status = 403;
        return next(error);
    }
}

export default auth;
