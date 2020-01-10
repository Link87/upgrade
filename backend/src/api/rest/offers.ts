import * as express from 'express';
import {Offer} from '../../models/offer';

class OfferRoute {

    private readonly router = express.Router();

    constructor() {

        this.router.get('/', async (
            _req: express.Request,
            res: express.Response) => {

            res.status(200).contentType('application/json').send([new Offer("MaLo ist viel zu schwer!","MaLo",420,"Student","MaLo Der Prof ist mega doof und das ist auf gar keinen Fall meine Schuld. Weil ich habe mir beim Abschreiben der Hausaufgaben immer sehr viel Mühe gegeben und den ersten Klausurversuch trotzdem nicht bestanden. asdhgiaushdioa. Helft mir bitte ich will meinen Bachelor.")]);
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export function offers(): express.Router {
    return new OfferRoute().getRouter();
}

export default offers;
