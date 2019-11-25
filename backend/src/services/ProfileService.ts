import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { Profile } from '../models/Profile';

export class ProfileService {

    constructor (private database: IDatabaseAdapter) {
    }

    public async getProfile(id: string): Promise<Profile | null> {
        const user = (await this.database.getUser(id));

        if (user !== null) {
            return user.profile;
        } else {
            return null;
        }
    }

}
