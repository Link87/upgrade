import * as bodyParser from 'body-parser';
import * as express from 'express';
import { ProfileService } from '../services/ProfileService';

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export class RestGateway {

    constructor (profileService: ProfileService) {
      const router = express.Router();

      router.get('/profile/:id', async (
        req: express.Request,
        response: express.Response,
        _next: express.NextFunction) => {
        const id = req.params.id;
        const profile = await profileService.getProfile(id);

        response.status(200).contentType('application/json').send(profile);
      });

      app.use('/', router);
    }

    public async listen(port: number) {
      app.listen(port, () => {
        console.log(`Started app at port ${port}`);
      });
    }

}
