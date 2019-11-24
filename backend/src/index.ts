import { IDatabaseAdapter } from './adapters/IDatabaseAdapter';
import { MongoDBAdapter } from './adapters/MongoDBAdapter';
import { RestGateway } from './api/RestGateway';
import { ProfileService } from './services/ProfileService';

const database: IDatabaseAdapter = new MongoDBAdapter();
const profileService = new ProfileService(database);

const restGateway = new RestGateway(profileService);
restGateway.listen(3000);
