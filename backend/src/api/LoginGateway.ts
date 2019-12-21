import * as express from 'express';
import { AuthenticationService } from '../services/AuthenticationService';

export class LoginGateway {

    public constructor (private authenticationService: AuthenticationService) {
    }

    public getRouter(): express.Router {
        const router = express.Router();

        router.post('/login', async (
          req: express.Request,
          response: express.Response,
          _next: express.NextFunction) => {
                const username = req.body.username;
                const password = req.body.password;

                const user = await this.authenticationService.verifyLoginData(username, password);
                if (user === null) {
                    response.status(403).send({ error: 'Access Denied.' });
                } else {
                    const token = await this.authenticationService.createToken(user.id);
                    response.status(200).send({ token });
                }
        });

        router.post('/create', async (
            req: express.Request,
            response: express.Response,
            _next: express.NextFunction) => {
                  const username = req.body.username;
                  const password = req.body.password;

                  const user = await this.authenticationService.createUserByLoginData(username, password);
                  if (user === null) {
                      response.status(403).send({ error: 'User already exists.' });
                  } else {
                      const token = await this.authenticationService.createToken(user.id);
                      response.status(200).send({ token });
                  }
          });

        return router;
    }

}

export default LoginGateway;
