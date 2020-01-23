import * as express from 'express';
import { ProfileService } from '../../../services/ProfileService';
import { auth } from '../auth';
import { AuthenticationService } from '../../../services/AuthenticationService';

export default class ProfileRoute {

    private readonly router = express.Router({ mergeParams: true });

    constructor(private readonly profileService: ProfileService, authenticationService: AuthenticationService) {

        const authentication = auth.bind(null, authenticationService);

        this.router.get('/', async (
            req: express.Request,
            res: express.Response) => {
            const id = req.params.id;
            const profileData = await this.profileService.getProfile(id);

            res.status(200).contentType('application/json').send(profileData);
        });

        this.router.put('/', authentication, async (
            req: express.Request,
            res: express.Response) => {
            const id = req.params.id;
            const profileData = req.body

            if (res.locals.user == null || res.locals.user.id !== id) {
                res.status(401).send({
                    error: "unauthorized"
                })

                return
            }

            this.profileService.updateProfile(id, profileData)

            res.status(200).contentType('application/json').send({
                status: "ok"
            });
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}
