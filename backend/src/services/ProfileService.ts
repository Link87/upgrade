import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { Profile } from '../models/Profile';

export class ProfileService {

    constructor (private database: IDatabaseAdapter) {
    }

    public async getProfile(id: string): Promise<Profile> {
        return (await this.database.getUser(id)).profile;
    }

}
