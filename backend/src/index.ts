import { HttpGateway } from './api/HttpGateway';
import { LoginGateway } from './api/LoginGateway';
import { RestGateway } from './api/RestGateway';
import { AuthenticationService } from './services/AuthenticationService';
import { ProfileService } from './services/ProfileService';
import { UserService } from './services/UserService';
import { MongoDBAdapter } from './adapters/MongoDBAdapter';

const mongoDB: MongoDBAdapter = new MongoDBAdapter();
console.log(mongoDB);

const userService = new UserService(mongoDB);
const profileService = new ProfileService(userService);

const authenticationService = new AuthenticationService(userService, 'hunter22');

const loginGateway = new LoginGateway(authenticationService);
const restGateway = new RestGateway(profileService);
const httpGateway = new HttpGateway(restGateway, loginGateway);
httpGateway.listen(3000);
