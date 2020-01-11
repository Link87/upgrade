import * as express from 'express';
import { OfferService } from '../services/OfferService';
import { ProfileService } from '../services/ProfileService';
import offers from './rest/offers';
import profile from './rest/profile';

export class RestGateway {

    private readonly router: express.Router;

    constructor(profileService: ProfileService, offerService: OfferService) {
        this.router = express.Router();

        // create middleware for v1 api version
        const api = express.Router({ mergeParams: true });
        this.router.use('/v1', api);

        api.use('/profile', profile(profileService));
        api.use('/offers', offers(offerService));

        // endpoint invalid (=> 404 not found)
        api.use(async (
            _req: express.Request,
            res: express.Response,
        ) => {
            res.status(404).end();
        });

        // catch wrong api version (currently all other than v1, => 501 not implemented)
        this.router.use(async (
            _req: express.Request,
            res: express.Response,
        ) => {
            res.status(501).end();
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export default RestGateway;
