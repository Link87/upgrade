import ChatGateway from './api/ChatGateway';
import HttpGateway from './api/HttpGateway';
import LoginGateway from './api/LoginGateway';
import RestGateway from './api/RestGateway';

// import { MockDatabaseAdapter } from './adapters/MockDatabaseAdapter';
import { MongoDBAdapter } from './adapters/MongoDBAdapter';
import { AuthenticationService } from './services/AuthenticationService';
import { OfferService } from './services/OfferService';
import { ProfileService } from './services/ProfileService';
import { UserService } from './services/UserService';

async function main() {
    const database: MongoDBAdapter = new MongoDBAdapter();
    await database.connect();

    const userService = new UserService(database);
    const profileService = new ProfileService(userService);
    const offerService = new OfferService(database);

    const authenticationService = new AuthenticationService(userService, 'hunter22');
    authenticationService.createUserByLoginData('test1', '123');
    authenticationService.createUserByLoginData('test2', '123');

    const loginGateway = new LoginGateway(authenticationService);
    const restGateway = new RestGateway(profileService, offerService, authenticationService);
    const httpGateway = new HttpGateway(restGateway, loginGateway);
    const server = await httpGateway.listen(3000);
    new ChatGateway(authenticationService).listen(server);
}

main();
