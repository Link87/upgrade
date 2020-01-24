import * as express from 'express';
import { AuthenticationService } from '../../../services/AuthenticationService';
import { ProfileService } from '../../../services/ProfileService';
import profile from './profile';

class UserRoute {

    private readonly router = express.Router();

    constructor(profileService: ProfileService, authenticationService: AuthenticationService) {
        this.router.use('/:id/profile', profile(profileService, authenticationService));
    }

    public getRouter(): express.Router {
        return this.router;
    }

}

export function user(profileService: ProfileService, authenticationService: AuthenticationService): express.Router {
    return new UserRoute(profileService, authenticationService).getRouter();
}

export default user;
