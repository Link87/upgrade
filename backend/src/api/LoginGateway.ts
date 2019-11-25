import * as express from 'express';
import { ProfileService } from '../services/ProfileService';

export class LoginGateway {

    public getRouter() {
        const router = express.Router();

        router.post('login', async (
          req: express.Request,
          response: express.Response,
          _next: express.NextFunction) => {

          response.status(200).contentType('application/json').send('ok');
        });

        router.use('/', router);
    }

}
