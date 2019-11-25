import { LoginCredentials } from '../models/LoginCredentials';
import { User } from '../models/User';
import { UserService } from './UserService';

export class AuthenticationService {

    constructor (private userService: UserService) {
    }

    public async authenticateToken(token: string): Promise<User | null> {
        // Not secure, tokens are same as user id at the moment
        return this.userService.findUser(token);
    }

    public async createToken(id: string): Promise<string> {
        // Not secure
        return id;
    }

    public async verifyLoginData(username: string, password: string) {
        // Also not secure
        const user = await this.userService.findUser(username);

        if (user == null) {
            return null;
        }

        return user.loginCredentials.password === password;
    }

    // Creates user and returns login token
    public async createUserByLoginData(username: string, password: string): Promise<string> {
        const loginCredentials = new LoginCredentials(username, password);
        const user = await this.userService.createUser(loginCredentials);
        const token = await this.createToken(user.id);
        return token;
    }

}
