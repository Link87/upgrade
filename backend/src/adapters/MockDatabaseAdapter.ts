import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { User } from '../models/User';

function deepCopyUser(user: User): User {
    return (JSON.parse(JSON.stringify(user)));
}

// MockDatabesAdapter saves the database state in ram and is for testing purposes only
export class MockDatabaseAdapter implements IDatabaseAdapter {

    private users: User[] = [];

<<<<<<< HEAD
    public async getUserById(id: string): Promise<User | null> {
        const usersWithId = this.users.filter(user => user.id === id);

        if (usersWithId.length > 0) {
            return usersWithId[0];
        } else {
            return null;
        }
    }

    public async getUserByUsername(id: string): Promise<User | null> {
=======
    public async getUser(id: string): Promise<User | null> {
>>>>>>> 6ad13f822da0a37a22d6ddf9a2621776c53fcdab
        const usersWithId = this.users.filter(user => user.id === id);

        if (usersWithId.length > 0) {
            return usersWithId[0];
        } else {
            return null;
        }
    }

    public async createUser(user: User): Promise<User> {
        const clonedUser = deepCopyUser(user);
        this.users.push(clonedUser);
        return clonedUser;
    }

    public async updateUser(user: User): Promise<User> {
        const clonedUser = deepCopyUser(user);

        this.users = this.users.filter(listUser => listUser.id !== user.id);
        this.users.push(clonedUser);
        return user;
    }

    public async deleteUser(id: string): Promise<void> {
        this.users = this.users.filter(user => user.id !== id);
        return;
    }

}
