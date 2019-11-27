import { User } from '../models/User';

export interface IDatabaseAdapter {

<<<<<<< HEAD
    getUserById(id: string): Promise<User | null>;

    getUserByUsername(id: string): Promise<User | null>;
=======
    getUser(id: string): Promise<User | null>;
>>>>>>> 6ad13f822da0a37a22d6ddf9a2621776c53fcdab

    createUser(user: User): Promise<User>;

    updateUser(user: User): Promise<User>;

    deleteUser(id: string): Promise<void>;

}
