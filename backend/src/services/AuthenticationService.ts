<<<<<<< HEAD
import { compare, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
=======
>>>>>>> 6ad13f822da0a37a22d6ddf9a2621776c53fcdab
import { LoginCredentials } from '../models/LoginCredentials';
import { User } from '../models/User';
import { UserService } from './UserService';

<<<<<<< HEAD
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
=======
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

    public async verifyLoginData(username: string, password: string): Promise<User | null> {
        // Also not secure
        const user = await this.userService.findUser(username);
>>>>>>> 6ad13f822da0a37a22d6ddf9a2621776c53fcdab

        if (user == null) {
            return null;
        }

<<<<<<< HEAD
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
=======
        return (user.loginCredentials.password === password) ? user : null;
    }

    // Creates user and returns login token
    public async createUserByLoginData(username: string, password: string): Promise<string> {
        const loginCredentials = new LoginCredentials(username, password);
        const user = await this.userService.createUser(loginCredentials);
        const token = await this.createToken(user.id);
        return token;
>>>>>>> 6ad13f822da0a37a22d6ddf9a2621776c53fcdab
    }

}
