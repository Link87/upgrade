import * as bodyParser from 'body-parser';
import * as express from 'express';
import { LoginGateway } from './LoginGateway';
import { RestGateway } from './RestGateway';

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export class HttpGateway {

    constructor (restGateway: RestGateway, loginGateway: LoginGateway) {
        const router = express.Router();
        router.use('/api', restGateway.getRouter());
        router.use('/auth', loginGateway.getRouter());
        app.use('/', router);
    }

    public async listen(port: number) {
      app.listen(port, () => {
        console.log(`Started app at port ${port}`);
      });
    }

}
