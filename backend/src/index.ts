import ChatGateway from './api/ChatGateway';
import HttpGateway from './api/HttpGateway';
import LoginGateway from './api/LoginGateway';
import RestGateway from './api/RestGateway';

import { AuthenticationService } from './services/AuthenticationService';
import { ProfileService } from './services/ProfileService';
import { UserService } from './services/UserService';
import { MongoDBAdapter } from './adapters/MongoDBAdapter';
import { MockDatabaseAdapter } from './adapters/MockDatabaseAdapter';

async function main() {
    const mongoDB: MongoDBAdapter = new MongoDBAdapter();
    console.log(mongoDB);

    const userService = new UserService(new MockDatabaseAdapter());
    const profileService = new ProfileService(userService);

    const authenticationService = new AuthenticationService(userService, 'hunter22');
    authenticationService.createUserByLoginData("test", "test")

    const loginGateway = new LoginGateway(authenticationService);
    const restGateway = new RestGateway(profileService);
    const httpGateway = new HttpGateway(restGateway, loginGateway);
    const server = await httpGateway.listen(3000);
    new ChatGateway(/*authenticationService*/).listen(server);
}

main();
