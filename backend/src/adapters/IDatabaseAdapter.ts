import { User } from '../models/User';

export interface IDatabaseAdapter {
    getUser(id: string): Promise<User>;
}
