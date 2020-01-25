import uuid = require('uuid');
import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { LoginCredentials } from '../models/LoginCredentials';
import { Profile } from '../models/Profile';
import { User } from '../models/User';

export class UserService {

    constructor (private database: IDatabaseAdapter) {
    }

    public async createUser(loginCredentials: LoginCredentials): Promise<User> {
        const user = new User(uuid(), Profile.default(), loginCredentials);
        return this.database.createUser(user);
    }

    public async getUserByUsername(username: string): Promise<User | undefined> {
        return this.database.getUserByUsername(username);
    }

    public async getUserById(id: string): Promise<User | undefined> {
        return this.database.getUserById(id);
    }

    public async deleteUser(id: string): Promise<void> {
        return this.database.deleteUser(id);
    }

    public async updateUser(user: User): Promise<User> {
        return this.database.updateUser(user);
    }

}
