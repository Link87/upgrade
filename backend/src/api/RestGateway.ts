import * as express from 'express';
import { ProfileService } from '../services/ProfileService';

export class RestGateway {

    constructor(private profileService: ProfileService) {}

    public getRouter(): express.Router {
        const router = express.Router();

        // create middleware for v1 api version
        const api = express.Router({mergeParams: true});
        router.use('/v1', api);

        api.get('/profile/:id', async (
            req: express.Request,
            res: express.Response) => {
            const id = req.params.id;
            const profile = await this.profileService.getProfile(id);

            res.status(200).contentType('application/json').send(profile);
        });
        api.get('/profile/:id/name', async (
            _req: express.Request,
            res: express.Response) => {
            // const id = req.params.id;
            // const profile = await this.profileService.getProfile(id);

            res.status(501).end();
            // res.status(200).contentType('text/plain').send(profile.getName());
        });
        api.get('/profile/:id/description', async (
            _req: express.Request,
            res: express.Response) => {
            // const id = req.params.id;
            // const profile = await this.profileService.getProfile(id);

            res.status(501).end();
            // res.status(200).contentType('text/plain').send(profile.getDescription());
        });

        // endpoint invalid (=> 404 not found)
        api.use(async (
            _req: express.Request,
            res: express.Response,
        ) => {
            res.status(404).end();
        });

        // catch wrong api version (currently all other than v1, => 501 not implemented)
        router.use(async (
            _req: express.Request,
            res: express.Response,
        ) => {
            res.status(501).end();
        });

        return router;
    }
}
