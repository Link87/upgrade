import { Profile } from '../models/Profile';
import { UserService } from './UserService';

export class ProfileService {

    constructor (private userService: UserService) {
    }

    public async getProfile(id: string): Promise<Profile | undefined> {
        const user = (await this.userService.getUserById(id));

        if (user !== undefined) {
            return user.profile;
        } else {
            return undefined;
        }
    }

}
