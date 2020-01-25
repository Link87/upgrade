import { LoginCredentials } from './LoginCredentials';
import { Profile } from './Profile';

export class User {

    constructor(public id: string,
                public profile: Profile,
                public loginCredentials: LoginCredentials) {
    }

}
