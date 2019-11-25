import { User } from '../models/User';

export interface IDatabaseAdapter {

    getUser(id: string): Promise<User | null>;

    createUser(user: User): Promise<User>;

    updateUser(user: User): Promise<User>;

    deleteUser(id: string): Promise<void>;

}
