import * as express from 'express';
import { AuthenticationService } from '../services/AuthenticationService';
import { ChatService } from '../services/ChatService';
import { ProfileService } from '../services/ProfileService';
import { UserService } from '../services/UserService';
import ChatGateway from './ChatGateway';
import chat from './rest/chat';
import profile from './rest/profile';

export class RestGateway {

    private readonly router: express.Router;

    constructor(profileService: ProfileService,
                chatService: ChatService,
                userService: UserService,
                authenticationService: AuthenticationService,
                chatGateway: ChatGateway) {
        this.router = express.Router();

        // create middleware for v1 api version
        const api = express.Router({ mergeParams: true });
        this.router.use('/v1', api);

        api.use('/profile', profile(profileService));
        api.use('/chat', chat(chatService, userService, authenticationService, chatGateway));

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
