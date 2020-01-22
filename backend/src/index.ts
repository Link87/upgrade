import ChatGateway from './api/ChatGateway';
import HttpGateway from './api/HttpGateway';
import LoginGateway from './api/LoginGateway';
import RestGateway from './api/RestGateway';

import { MockDatabaseAdapter } from './adapters/MockDatabaseAdapter';
// import { MongoDBAdapter } from './adapters/MongoDBAdapter';
import { Chat } from './models/Chat';
import { AuthenticationService } from './services/AuthenticationService';
import { ChatService } from './services/ChatService';
import { OfferService } from './services/OfferService';
import { ProfileService } from './services/ProfileService';
import { UserService } from './services/UserService';

async function main() {
    // const database: MongoDBAdapter = new MongoDBAdapter();
    // await database.connect();
    const database = new MockDatabaseAdapter();

    const userService = new UserService(database);
    const profileService = new ProfileService(userService);
    const offerService = new OfferService(database);
    const chatService = new ChatService(database);
    chatService.createChat(new Chat('test', 'test1', 'test2'));

    const authenticationService = new AuthenticationService(userService, 'hunter22');
    authenticationService.createUserByLoginData('test1', '123');
    authenticationService.createUserByLoginData('test2', '123');
    authenticationService.createUserByLoginData('test3', '123');

    const chatGateway = new ChatGateway(authenticationService, chatService);
    const loginGateway = new LoginGateway(authenticationService);
    const restGateway =
            new RestGateway(profileService, chatService, userService, offerService, chatGateway, authenticationService);
    const httpGateway = new HttpGateway(restGateway, loginGateway);
    const server = await httpGateway.listen(3000);
    chatGateway.listen(server);
}

main();
