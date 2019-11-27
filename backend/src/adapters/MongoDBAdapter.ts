import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { LoginCredentials } from '../models/LoginCredentials';
import { Profile } from '../models/Profile';
import { User } from '../models/User';

export class MongoDBAdapter implements IDatabaseAdapter {

<<<<<<< HEAD
    public async getUserById(id: string): Promise<User> {
        return new User(id, new Profile('Max Musterman', 'Im an example user.'), new LoginCredentials('username', 'password'));
    }

    public async getUserByUsername(id: string): Promise<User> {
=======
    public async getUser(id: string): Promise<User> {
>>>>>>> 6ad13f822da0a37a22d6ddf9a2621776c53fcdab
        return new User(id, new Profile('Max Musterman', 'Im an example user.'), new LoginCredentials('username', 'password'));
    }

    public async createUser(user: User): Promise<User> {
        return user;
    }

    public async updateUser(user: User): Promise<User> {
        return user;
    }

    public async deleteUser(_id: string): Promise<void> {
        return;
    }

}
