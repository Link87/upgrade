import * as express from 'express';

// tslint:disable: no-shadowed-variable
export async function error(
    err: Error,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    if (res.headersSent) {
        return next(err);
    }

    const error = err as HttpError;
    console.error(error.message);
    res.status(error.status);
    res.send(error.message);
}

export type HttpError = Error & { status: number };

export default error;
