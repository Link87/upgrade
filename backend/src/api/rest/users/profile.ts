import * as express from 'express';
import { AuthenticationService } from '../../../services/AuthenticationService';
import { ProfileService } from '../../../services/ProfileService';
import { HttpError } from '../../ErrorHandler';
import { auth } from '../auth';

class ProfileRoute {

    private readonly router = express.Router({ mergeParams: true });

    constructor(private readonly profileService: ProfileService, authenticationService: AuthenticationService) {

        const authentication = auth.bind(null, authenticationService);

        this.router.get('/', async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
            const id = req.params.id;
            const profileData = await this.profileService.getProfile(id);

            if (profileData === undefined) {
                const error = new Error('Profile not found') as HttpError;
                error.status = 404;
                return next(error);
            }

            res.status(200).contentType('application/json').send(profileData);
        });

        this.router.put('/', authentication, async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
            const id = req.params.id;
            const profileData = req.body;

            if (res.locals.user.id !== id) {
                const error = new Error('Access Denied') as HttpError;
                error.status = 403;
                return next(error);
            }

            this.profileService.updateProfile(id, profileData);

            res.status(200).contentType('application/json').send({
                status: 'ok',
            });
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export function profile(profileService: ProfileService, authenticationService: AuthenticationService): express.Router {
    return new ProfileRoute(profileService, authenticationService).getRouter();
}

export default profile;
