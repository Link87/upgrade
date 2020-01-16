import * as express from 'express';
import { ProfileService } from '../../../services/ProfileService';
import ProfileRoute from './profile';
import { AuthenticationService } from '../../../services/AuthenticationService';

export default class UserRoute {

    private readonly router = express.Router();

    constructor(profileService: ProfileService, authenticationService: AuthenticationService) {
        const profileRoute = new ProfileRoute(profileService, authenticationService);
        this.router.use('/:id/profile', profileRoute.getRouter());
    }

    public getRouter(): express.Router {
        return this.router;
    }

}

