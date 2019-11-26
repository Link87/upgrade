import { IDatabaseAdapter } from './adapters/IDatabaseAdapter';
import { MockDatabaseAdapter } from './adapters/MockDatabaseAdapter';
import { HttpGateway } from './api/HttpGateway';
import { LoginGateway } from './api/LoginGateway';
import { RestGateway } from './api/RestGateway';
import { LoginCredentials } from './models/LoginCredentials';
import { AuthenticationService } from './services/AuthenticationService';
import { ProfileService } from './services/ProfileService';
import { UserService } from './services/UserService';

const database: IDatabaseAdapter = new MockDatabaseAdapter();
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

const loginGateway = new LoginGateway(authenticationService);
const restGateway = new RestGateway(profileService);
const httpGateway = new HttpGateway(restGateway, loginGateway);
httpGateway.listen(3000);
