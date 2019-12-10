import { compare, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { LoginCredentials } from '../models/LoginCredentials';
import { User } from '../models/User';
import { UserService } from './UserService';

const saltRounds = 10;

export class AuthenticationService {

    constructor (private userService: UserService, private jwtSecret: string) {
    }

    public async authenticateToken(token: string): Promise<User | null> {
        const payload: any = await verify(token, this.jwtSecret);
        const userId = payload.userId.toString();
        return this.userService.getUserById(userId);
    }

    public async createToken(id: string): Promise<string> {
        const token = await sign({
            userId: id,
        }, this.jwtSecret);
        return token;
    }

    public async verifyLoginData(username: string, password: string): Promise<User | null> {
        const user = await this.userService.getUserByUsername(username);

        if (user == null) {
            return null;
        }

        const passwordMatches = await compare(password, user.loginCredentials.password);
        return passwordMatches ? user : null;
    }

    public async createUserByLoginData(username: string, password: string): Promise<User | null> {
        const existingUser = await this.userService.getUserByUsername(username);
        if (existingUser !== null) {
            return null;
        }

        const salt = await genSalt(saltRounds);
        const passwordHash = await hash(password, salt);
        
        const loginCredentials = new LoginCredentials(username, passwordHash);
        const user = await this.userService.createUser(loginCredentials);

        return user;
    }

}
