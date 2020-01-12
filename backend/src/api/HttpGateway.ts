import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import error from './ErrorHandler';
import LoginGateway from './LoginGateway';
import RestGateway from './RestGateway';

const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Insecure af
app.use(helmet());

export class HttpGateway {

    constructor (restGateway: RestGateway, loginGateway: LoginGateway) {
        const router = express.Router();
        router.use('/api', restGateway.getRouter());
        router.use('/auth', loginGateway.getRouter());

        app.use('/', router);

        app.use(error);
    }

    public async listen(port: number) {
        return app.listen(port, () => {
            console.log(`Started app at port ${port}`);
        });
    }

}

export default HttpGateway;
