import * as express from 'express';
import { ProfileService } from '../../services/ProfileService';

class ProfileRoute {

    private readonly router = express.Router();

    constructor(private readonly profileService: ProfileService) {

        this.router.get('/:id', async (
            req: express.Request,
            res: express.Response) => {
            const id = req.params.id;
            const profileData = await this.profileService.getProfile(id);

            res.status(200).contentType('application/json').send(profileData);
        });

        this.router.get('/:id/name', async (
            _req: express.Request,
            res: express.Response) => {
            // const id = req.params.id;
            // const profile = await this.profileService.getProfile(id);

            res.status(501).end();
            // res.status(200).contentType('text/plain').send(profile.getName());
        });

        this.router.get('/:id/description', async (
            _req: express.Request,
            res: express.Response) => {
            // const id = req.params.id;
            // const profile = await this.profileService.getProfile(id);

            res.status(501).end();
            // res.status(200).contentType('text/plain').send(profile.getDescription());
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export function profile(profileService: ProfileService): express.Router {
    return new ProfileRoute(profileService).getRouter();
}

export default profile;
