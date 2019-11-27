import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { LoginCredentials } from '../models/LoginCredentials';
import { Profile } from '../models/Profile';
import { User } from '../models/User';

export class UserService {

    constructor (private database: IDatabaseAdapter) {
    }

    public async createUser(loginCredentials: LoginCredentials): Promise<User> {
        const user = new User(loginCredentials.username, new Profile(loginCredentials.username, ''), loginCredentials);
        return this.database.createUser(user);
    }

<<<<<<< HEAD
    public async getUserByUsername(username: string): Promise<User | null> {
        return this.database.getUserByUsername(username);
    }

    public async getUserById(id: string): Promise<User | null> {
        return this.database.getUserById(id);
=======
    public async findUser(username: string): Promise<User | null> {
        return this.database.getUser(username);
>>>>>>> 6ad13f822da0a37a22d6ddf9a2621776c53fcdab
    }

    public async deleteUser(id: string): Promise<void> {
        return this.database.deleteUser(id);
    }

    public async updateUser(user: User): Promise<User> {
        return this.database.updateUser(user);
    }

}
