import * as express from 'express';
import { Offer } from '../../models/offer';
import { AuthenticationService } from '../../services/AuthenticationService';
import { OfferService } from '../../services/OfferService';
import { auth } from './auth';

class OfferRoute {

    private readonly router = express.Router();

    constructor(offerService: OfferService, authenticationService: AuthenticationService) {

        const authentication = auth.bind(null, authenticationService);

        this.router.get('/', async (
            _req: express.Request,
            res: express.Response) => {
            const requestedOffers = await offerService.getOffers();
            res.status(200).contentType('application/json').send(requestedOffers);
        });

        this.router.post('/new', authentication, async (
            req: express.Request,
            res: express.Response) => {
            const offer: Offer = req.body;

            if (res.locals.user === null) {
                res.status(400).send('error');
                return;
            }
            offer.owner = res.locals.user?.id!;

            const id = await offerService.createOffer(offer);
            res.status(200).contentType('application/json').send({
                id,
                status: 'ok',
            });
        });

        this.router.delete('/:id', authentication, async (
            req: express.Request,
            res: express.Response) => {
            const id = req.params.id;

            const offer = await offerService.getOffer(id);
            if (!(res.locals.user?.id === offer?.owner)) {
                res.status(400).send('error');
                return;
            }

            await offerService.deleteOffer(id);
            res.status(200).contentType('application/json').send({
                status: 'ok',
            });
        });

        this.router.get('/:id', async (
            req: express.Request,
            res: express.Response) => {
            const id = req.params.id;

            const offer = await offerService.getOffer(id);
            res.status(200).contentType('application/json').send(offer);
        });

        this.router.put('/:id', authentication, async (
            req: express.Request,
            res: express.Response) => {
            const id = req.params.id;
            const newOffer = req.body;

            const oldOffer = await offerService.getOffer(id);

            if (!(res.locals.user?.id === oldOffer?.owner)) {
                res.status(400).send('error');
                return;
            }

            if (id !== newOffer.id) {
                res.status(400).contentType('application/json').send({
                    status: 'bad request',
                });
            }

            const offer = await offerService.updateOffer(newOffer);
            res.status(200).contentType('application/json').send(offer);
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export function offers(offerService: OfferService, authenticationService: AuthenticationService): express.Router {
    return new OfferRoute(offerService, authenticationService).getRouter();
}

export default offers;
