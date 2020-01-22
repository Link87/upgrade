import * as express from 'express';
import { AuthenticationService } from '../services/AuthenticationService';
import { ChatService } from '../services/ChatService';
import { OfferService } from '../services/OfferService';
import { ProfileService } from '../services/ProfileService';
import { UserService } from '../services/UserService';
import ChatGateway from './ChatGateway';
import chat from './rest/chat';
import offers from './rest/offers';
import profile from './rest/profile';

export class RestGateway {

    private readonly router: express.Router;

    constructor(profileService: ProfileService,
                chatService: ChatService,
                userService: UserService,
                offerService: OfferService,
                chatGateway: ChatGateway,
                authenticationService: AuthenticationService) {
        this.router = express.Router();

        // create middleware for v1 api version
        const api = express.Router({ mergeParams: true });
        this.router.use('/v1', api);

        api.use(async (
            req: express.Request,
            _res: express.Response,
            next: express.NextFunction,
        ) => {
            const token: string = req.headers.token?.toString()!;
            const user = await authenticationService.authenticateToken(token);
            const anyRequest: any = req;
            anyRequest.user = user;

            next();
        });

        api.use('/profile', profile(profileService));
        api.use('/chat', chat(chatService, userService, authenticationService, chatGateway));
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
