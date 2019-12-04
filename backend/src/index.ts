import { IDatabaseAdapter } from './adapters/IDatabaseAdapter';
import { MockDatabaseAdapter } from './adapters/MockDatabaseAdapter';
import { HttpGateway } from './api/HttpGateway';
import { LoginGateway } from './api/LoginGateway';
import { RestGateway } from './api/RestGateway';
import { AuthenticationService } from './services/AuthenticationService';
import { ProfileService } from './services/ProfileService';
import { UserService } from './services/UserService';

const database: IDatabaseAdapter = new MockDatabaseAdapter();
const userService = new UserService(database);
const profileService = new ProfileService(userService);

const authenticationService = new AuthenticationService(userService, 'hunter22');

const loginGateway = new LoginGateway(authenticationService);
const restGateway = new RestGateway(profileService);
const httpGateway = new HttpGateway(restGateway, loginGateway);
httpGateway.listen(3000);
