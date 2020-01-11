import uuid = require('uuid');
import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { Offer } from '../models/offer';

export class OfferService {

    constructor (private database: IDatabaseAdapter) {
    }

    public async getOffers(): Promise<Offer[]> {
        return this.database.getOffers();
    }

    public async getOffer(id: string): Promise<Offer | null> {
        return this.database.getOffer(id);
    }

    public async deleteOffer(id: string) {
        return this.database.deleteOffer(id);
    }

    public async updateOffer(offer: Offer) {
        return this.database.updateOffer(offer);
    }

    public async createOffer(offer: Offer) {
        // Assigns a unique id to the offer to ensure no collisions happen
        const id = uuid();
        offer.id = id;

        this.database.createOffer(offer);
    }
}
