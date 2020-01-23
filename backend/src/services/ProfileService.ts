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

    public async updateProfile(id: string, profile: Profile) {
        const user = (await this.userService.getUserById(id));

        if (user !== null) {
            user.profile = profile;
            await this.userService.updateUser(user);
        }
    }

}
