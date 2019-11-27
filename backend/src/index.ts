import { IDatabaseAdapter } from './adapters/IDatabaseAdapter';
import { MockDatabaseAdapter } from './adapters/MockDatabaseAdapter';
import { HttpGateway } from './api/HttpGateway';
import { LoginGateway } from './api/LoginGateway';
import { RestGateway } from './api/RestGateway';
<<<<<<< HEAD
=======
import { LoginCredentials } from './models/LoginCredentials';
>>>>>>> 6ad13f822da0a37a22d6ddf9a2621776c53fcdab
import { AuthenticationService } from './services/AuthenticationService';
import { ProfileService } from './services/ProfileService';
import { UserService } from './services/UserService';

const database: IDatabaseAdapter = new MockDatabaseAdapter();
<<<<<<< HEAD
const userService = new UserService(database);
const profileService = new ProfileService(userService);

const authenticationService = new AuthenticationService(userService, 'hunter22');
=======
const profileService = new ProfileService(database);

const userService = new UserService(database);
const authenticationService = new AuthenticationService(userService);

async function test() {
    const user1 = await userService.createUser(new LoginCredentials('user', '123'));
    const user2 = await userService.findUser('user');
    console.log(user1);
    console.log(user2);
}
test();
>>>>>>> 6ad13f822da0a37a22d6ddf9a2621776c53fcdab

const loginGateway = new LoginGateway(authenticationService);
const restGateway = new RestGateway(profileService);
const httpGateway = new HttpGateway(restGateway, loginGateway);
httpGateway.listen(3000);
