import { Profile } from '../models/Profile';
import { UserService } from './UserService';

export class ProfileService {

    constructor (private userService: UserService) {
    }

    public async getProfile(id: string): Promise<Profile | null> {
<<<<<<< HEAD
        const user = (await this.userService.getUserById(id));
=======
        const user = (await this.database.getUser(id));
>>>>>>> 6ad13f822da0a37a22d6ddf9a2621776c53fcdab

        if (user !== null) {
            return user.profile;
        } else {
            return null;
        }
    }

}
