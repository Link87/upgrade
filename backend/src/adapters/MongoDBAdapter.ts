import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { Profile } from '../models/Profile';
import { User } from '../models/User';

export class MongoDBAdapter implements IDatabaseAdapter {

    public async getUser(id: string): Promise<User> {
        return new User(id, new Profile('Max Musterman', 'Im an example user.'));
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
